import { Octokit } from "@octokit/rest";
import { Value } from "@sinclair/typebox/value";
import { DefinedError } from "ajv";
import mergeWith from "lodash/merge";
import YAML from "yaml";
import { BotConfig, stringDuration, validateBotConfig } from "../types/configuration-types";

const UBIQUIBOT_CONFIG_REPOSITORY = "ubiquibot-config";
const UBIQUIBOT_CONFIG_FULL_PATH = ".github/ubiquibot-config.yml";

export async function generateConfiguration(
  authenticatedOctokit: Octokit,
  owner: string,
  repository: string
): Promise<BotConfig> {
  const orgConfig = parseYaml(
    await download({
      repository: UBIQUIBOT_CONFIG_REPOSITORY,
      owner: owner,
      authenticatedOctokit,
    })
  );

  const repoConfig = parseYaml(
    await download({
      repository: repository,
      owner,
      authenticatedOctokit,
    })
  );

  const merged = mergeWith({}, orgConfig, repoConfig, (objValue: unknown, srcValue: unknown) => {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      // if it's string array, concat and remove duplicates
      if (objValue.every((value) => typeof value === "string")) {
        return [...new Set(objValue.concat(srcValue))];
      }
      // otherwise just concat
      return objValue.concat(srcValue);
    }
  });

  const isValid = validateBotConfig(merged);
  if (!isValid) {
    const errorMessage = getErrorMsg(validateBotConfig.errors as DefinedError[]);
    if (errorMessage) {
      throw new Error("Invalid merged configuration");
    }
  }

  // this will run transform functions
  try {
    transformConfig(merged);
  } catch (err) {
    throw new Error("Configuration error");
  }

  // console.dir(merged, { depth: null, colors: true });
  return merged as BotConfig;
}

// Transforming the config only works with Typebox and not Ajv
// When you use Decode() it not only transforms the values but also validates the whole config and Typebox doesn't return all errors so we can filter for correct ones
// That's why we have transform every field manually and catch errors
export function transformConfig(config: BotConfig) {
  let errorMsg = "";
  try {
    config.timers.reviewDelayTolerance = Value.Decode(stringDuration(), config.timers.reviewDelayTolerance);
  } catch (err: unknown) {
    const decodeError = err as DecodeError;
    if (decodeError.value) {
      errorMsg += `Invalid reviewDelayTolerance value: ${decodeError.value}\n`;
    }
  }
  try {
    config.timers.taskStaleTimeoutDuration = Value.Decode(stringDuration(), config.timers.taskStaleTimeoutDuration);
  } catch (err: unknown) {
    const decodeError = err as DecodeError;
    if (decodeError.value) {
      errorMsg += `Invalid taskStaleTimeoutDuration value: ${decodeError.value}\n`;
    }
  }
  try {
    config.timers.taskFollowUpDuration = Value.Decode(stringDuration(), config.timers.taskFollowUpDuration);
  } catch (err: unknown) {
    const decodeError = err as DecodeError;
    if (decodeError.value) {
      errorMsg += `Invalid taskFollowUpDuration value: ${decodeError.value}\n`;
    }
  }
  try {
    config.timers.taskDisqualifyDuration = Value.Decode(stringDuration(), config.timers.taskDisqualifyDuration);
  } catch (err: unknown) {
    const decodeError = err as DecodeError;
    if (decodeError.value) {
      errorMsg += `Invalid taskDisqualifyDuration value: ${decodeError.value}\n`;
    }
  }
  if (errorMsg) throw new Error(errorMsg);
}

function getErrorMsg(errors: DefinedError[]) {
  const errorsWithoutStrict = errors.filter((error) => error.keyword !== "additionalProperties");
  return errorsWithoutStrict.length === 0
    ? null
    : errorsWithoutStrict.map((error) => error.instancePath.replaceAll("/", ".") + " " + error.message).join("\n");
}
async function download({
  repository,
  owner,
  authenticatedOctokit,
}: {
  repository: string;
  owner: string;
  authenticatedOctokit: Octokit;
}): Promise<string | null> {
  if (!repository || !owner) throw new Error("Repo or owner is not defined");

  // const installationOctokit = (await getInstallationOctokitForOrg(authToken, owner)) as unknown as ExampleInstallation;
  // const authenticatedOctokit = new Octokit({ auth: authToken });

  try {
    const { data } = await authenticatedOctokit.rest.repos.getContent({
      owner,
      repo: repository,
      path: UBIQUIBOT_CONFIG_FULL_PATH,
      mediaType: { format: "raw" },
    });
    return data as unknown as string; // this will be a string if media format is raw
  } catch (err) {
    return null;
  }
}
// async function getInstallationOctokitForOrg(authToken: string, org: string) {
//   // You might need to adapt this part based on the actual event type your app handles
//   const installations = await context.octokit.apps.listInstallations();
//   // context.logger.debug("installations", installations);
//   const installation = installations.data.find((inst) => inst.account?.login === org) as ExampleResponse;
//   // context.logger.debug("installation", installation);

//   if (!installation) {
//     throw new Error(`No installation found for organization: ${org}`);
//   }

//   return context.octokit.auth({
//     type: "installation",
//     installationId: installation.id,
//   }) as Promise<InstanceType<typeof Octokit>>;
// }

export function parseYaml(data: null | string) {
  try {
    if (data) {
      const parsedData = YAML.parse(data);
      return parsedData ?? null;
    }
  } catch (error) {
    throw new Error("Failed to parse YAML");
  }
  return null;
}

interface DecodeError extends Error {
  value?: string;
}
