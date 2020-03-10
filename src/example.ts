import {
  MetamaskProvider,
  buildGatewayConfig,
  NetworkKind
} from "@0xcert/ethereum-metamask-provider";
import { Client, Priority, AssetLedgerCapability } from "@0xcert/client";
import { config } from "./config";

// We create a new instance of metamask provider.
const provider = new MetamaskProvider({
  gatewayConfig: buildGatewayConfig(NetworkKind.RINKEBY)
});

export async function init() {
  // We first check if metamask is already enabled.
  if (!(await provider.isEnabled())) {
    // If metamask is not enabled, we enable it.
    await provider.enable();
  }

  config.client = new Client({
    provider,
    apiUrl: "https://api-staging.0xcert.org"
  });

  return config.client.init();
}

export async function createDeployment() {
  const deployment = await config.client.createDeployment(
    {
      name: "Math Course Certificate",
      symbol: "MCC",
      uriPrefix: "https://0xcert.org/assets/",
      uriPostfix: ".json",
      schemaId:
        "3f4a0870cd6039e6c987b067b0d28de54efea17449175d7a8cd6ec10ab23cc5d", // base asset schemaId
      capabilities: [
        AssetLedgerCapability.TOGGLE_TRANSFERS,
        AssetLedgerCapability.DESTROY_ASSET,
        AssetLedgerCapability.REVOKE_ASSET,
        AssetLedgerCapability.UPDATE_ASSET
      ],
      ownerId: config.client.provider.accountId
    },
    Priority.LOW
  );

  config.deploymentRef = deployment.data.ref;
  return deployment;
}

export async function getDeploymentInfo() {
  return config.client.getDeployment(config.deploymentRef);
}
