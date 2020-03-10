import {
  MetamaskProvider,
  buildGatewayConfig,
  NetworkKind
} from "@0xcert/ethereum-metamask-provider";
import { Client, Priority } from "@0xcert/client";
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
    apiUrl: "https://api-rinkeby.0xcert.org"
  });

  return config.client.init();
}

export async function createValueApproval() {
  const approval = await config.client.createApproval(
    {
      spender: config.assetLedgerId,
      value: 100
    },
    Priority.LOW
  );

  config.valueApprovalRef = approval.data.ref;
  return approval;
}

export async function getValueApproveInfo() {
  return config.client.getApproval(config.valueApprovalRef);
}

export async function createAssetApproval() {
  const approval = await config.client.createApproval(
    {
      ledgerId: config.assetLedgerId,
      receiverId: config.operator,
      approve: true
    },
    Priority.LOW
  );

  config.assetApprovalRef = approval.data.ref;
  return approval;
}

export async function getAssetApproveInfo() {
  return config.client.getApproval(config.assetApprovalRef);
}
