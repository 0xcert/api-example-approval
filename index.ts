import {
  init,
  createValueApproval,
  getValueApproveInfo,
  createAssetApproval,
  getAssetApproveInfo
} from "./src/example";
import { config } from "./src/config";

const divConsole = document.getElementById("console");
const btnInitialize = document.getElementById("btnInitialize");
const btnCreateValueApproval = document.getElementById(
  "btnCreateValueApproval"
);
const btnGetValueApproveInfo = document.getElementById(
  "btnGetValueApproveInfo"
);
const btnCreateAssetApproval = document.getElementById(
  "btnCreateAssetApproval"
);
const btnGetAssetApproveInfo = document.getElementById(
  "btnGetAssetApproveInfo"
);

btnInitialize.addEventListener("click", async () => {
  try {
    await init();
    printMessage("Initialized.");
  } catch (e) {
    printError(e);
  }
});

btnCreateValueApproval.addEventListener("click", async () => {
  if (config.client === null) {
    printWarning("First initialize the client.");
    return;
  }
  if (config.assetLedgerId === "") {
    printWarning(
      "No assetLedgerSource defined. Either deploy a new asset ledger or set asset ledger source in src/config.ts file."
    );
    return;
  }
  if (config.operator === "") {
    printWarning("No operator defined. Set operator in src/config.ts file.");
    return;
  }
  printMessage("Creating value approval");
  try {
    const approval = await createValueApproval();
    printMessage(approval.data);
  } catch (e) {
    printError(e);
  }
});

btnCreateAssetApproval.addEventListener("click", async () => {
  if (config.valueApprovalRef === "") {
    printWarning("First approve value.");
    return;
  }
  const valueApprove = await getValueApproveInfo();
  if (valueApprove.data.status < 3) {
    printWarning("Value approval still in progress. This can take a minute.");
    return;
  }
  printMessage("Creating asset approval");
  try {
    const approval = await createAssetApproval();
    printMessage(approval.data);
  } catch (e) {
    printError(e);
  }
});

btnGetValueApproveInfo.addEventListener("click", async () => {
  if (config.valueApprovalRef === "") {
    printWarning("First create an value approval.");
    return;
  }
  try {
    const approve = await getValueApproveInfo();
    printMessage(approve.data);
  } catch (e) {
    printError(e);
  }
});

btnGetAssetApproveInfo.addEventListener("click", async () => {
  if (config.assetApprovalRef === "") {
    printWarning("First create an asset approval.");
    return;
  }
  try {
    const approve = await getAssetApproveInfo();
    printMessage(approve.data);
  } catch (e) {
    printError(e);
  }
});

function printMessage(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = message;
  divConsole.prepend(div);
}

function printWarning(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Warning: " + message;
  div.className = "warning";
  divConsole.prepend(div);
}

function printError(message: any) {
  console.log(message);
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Error: " + message;
  div.className = "error";
  divConsole.prepend(div);
}
