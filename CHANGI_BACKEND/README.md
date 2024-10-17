# GitHub Actions for Lambda and API Gateway Deployment

This repository uses GitHub Actions to automate testing and deployment of an AWS Lambda and API Gateway project. This guide explains how to set up and use the GitHub Actions workflow for deployment.

## GitHub Actions Workflow Overview

### Workflow Trigger
The deployment workflow is triggered automatically when code is pushed to the `main` branch.

### Jobs in the Workflow

#### 1. **Test Job**
   - **Runs on:** `ubuntu-latest`
   - **Steps:**
     1. Checkout the repository.
     2. Set up Python 3.10 environment.
     3. Install project dependencies.
     4. Run unit tests using `pytest`.
     5. Upload unit test results as an artifact.
     6. Install `bandit` for security testing. (for documentation, please visit https://bandit.readthedocs.io/en/latest/plugins/index.html)
     7. Run `bandit` security scan and upload the report.

#### 2. **Build and Deploy Job**
   - **Runs on:** `ubuntu-latest`
   - **Depends on:** The `test` job must pass before the deploy job runs.
   - **Steps:**
     1. Checkout the repository.
     2. Set up Python 3.10 environment.
     3. Package the Lambda function and deploy to AWS using AWS CLI.

#### 3. **Performance Testing Job**
   - **Runs on:** `ubuntu-latest`
   - **Steps:**
     1. Checkout the repository.
     2. Download and install [Apache JMeter](https://jmeter.apache.org/) for performance testing.
     3. Prepare a JMeter performance test plan (`test_plan.jmx`).
     4. Execute the JMeter test plan.
     5. Upload JMeter results as an artifact for review.

## Secrets Configuration

To securely store sensitive information like API keys and AWS credentials, GitHub Actions uses **Secrets**. These secrets are stored in GitHub and can be referenced in the workflow YAML files.

### How to Add Secrets to GitHub

1. Navigate to your repository on GitHub.
2. Click on **Settings**.
3. In the left sidebar, click on **Secrets and variables** and then **Actions**.
4. Click **New repository secret**.
5. Add the following secrets (used in the deployment process):
   - `AWS_ACCESS_KEY_ID` – Your AWS Access Key ID.
   - `AWS_SECRET_ACCESS_KEY` – Your AWS Secret Access Key.
   - `API_KEY` – API key for services that need it.
   - `ASSISTANT_ID` – Needed for backend
   - `OPENAI_API_KEY` – API Key to communicate with Open AI API
   - `OPENAI_API_URL` – URL to OpenAI API
   - `VECTOR_ID` – Needed for backend

Once these secrets are added, they will be available to the GitHub Actions workflows and can be referenced using `${{ secrets.SECRET_NAME }}`.

## Deployment Process

The deployment is managed through the `deploy.yaml` file located in the `.github/workflows/` directory. Here is a summary of the deployment steps:

1. **Checkout Code:** The code from the repository is checked out to the runner environment.
2. **Set Up Python:** The Python environment is set up with the specified version (3.10).
3. **Package Lambda Function:** The Lambda function is packaged using the AWS CLI.
4. **Deploy Lambda and API Gateway:** The Lambda function and API Gateway are deployed using AWS CLI commands, as configured in the deployment scripts.

## Customization

You can customize the workflow by:
- Adding or removing testing steps in the `test` job.
- Adjusting deployment settings like the AWS region or Lambda function configuration in the deployment steps.

## Conclusion

This GitHub Actions workflow streamlines the process of testing and deploying AWS Lambda functions with API Gateway integration. Ensure that all necessary secrets are configured before pushing changes to the `main` branch to enable automated deployment.
