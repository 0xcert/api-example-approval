import { init, getDeploymentInfo, createDeployment } from "./src/example";
import { config } from "./src/config";

const divConsole = document.getElementById("console");
const btnInitialize = document.getElementById("btnInitialize");
const btnCreateDeployment = document.getElementById("btnCreateDeployment");
const btnGetDeployInfo = document.getElementById("btnGetDeployInfo");

btnInitialize.addEventListener("click", async () => {
  try {
    await init();
    printMessage("Initialized.");
  } catch (e) {
    printError(e);
  }
});

btnCreateDeployment.addEventListener("click", async () => {
  if (config.client === null) {
    printWarning("First initialize the client.");
    return;
  }
  printMessage("Deploying asset ledger");
  try {
    const deployment = await createDeployment();
    printMessage(deployment.data);
  } catch (e) {
    printError(e);
  }
});

btnGetDeployInfo.addEventListener("click", async () => {
  if (config.deploymentRef === "") {
    printWarning("First create a deployment.");
    return;
  }
  try {
    const deployment = await getDeploymentInfo();
    printMessage(deployment.data);
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
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Error: " + message;
  div.className = "error";
  divConsole.prepend(div);
}
