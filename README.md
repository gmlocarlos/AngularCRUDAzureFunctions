# AngularCRUDAzureFunctions

This is a Angular project with CRUD operations and consume Azure Functions of type HttpTrigger. You can see a example running project in <https://accountstoragehelpdesk.z13.web.core.windows.net/>

## Usage

**Step 1.** Clone this repository and open in Visual Studio Code.

**Step 2.** Install the dependencies with the next command:

```nodejs
npm install
```

**Step 3.** Compile the project with the next command:

```nodejs
ng serve
```

## Deploy to Azure

You can upload this frontend project in several services of azure, in this example I've upload this project in Azure Blob Storage.

**Step 1.** Generate a build with the next command (this command will generate a build in the **dist** folder)

```angular
ng build --configuration production
```

**Step 2.** In azure portal, create a storage account.

**Step 3.** In the Visual Studio Code install the extension **Azure Storage

**Step 4.** In the **Azure** option in the left side, sign in with your azure account

**Step 5.** In the **Storage** section find your create storage account and right click, and press the option **Deploy to static website via Azure Storage...** and browse and select the build folder into **dist** folder
