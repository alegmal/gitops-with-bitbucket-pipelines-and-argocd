# GitOps CI/CD with Bitbucket Pipelines for a Simple TypeScript (Node.js) Application

This is one of my exploratory project to dive into DevOps practices.
This is not a working "out of the box" example but more of a general reference repository

---

## what's Involved:

- Tested with nodejs v14.21.3 on Mac (intel)
- A Kubernetes (k8s) cluster (validated on remote, but should also be operable locally)
- ArgoCD installed in the cluster
- A container image repository
- A private Bitbucket repository to host Helm charts for all applications (lets call it `helm charts repository`)
- This Bitbucket repository (`application repository`) containing the TypeScript code, along with the application Helm chart, which gets copied over to the central Helm charts repository

### Clarifications

* This repository represents 'awesome' application which runs as container / service in kubernetes. Each application will have its own repository and similar pipeline. `helm charts repository` will contain helm charts for each service

* The clone uses authentication token because it clones and pushes a private repository

---
## working with repository

### init repository
```
npm install && npm run build
```
### run test

```
npm run test
```

---

## workflow:

When you update your code and push it to the application repository, the CI/CD pipeline does the following:

- If a tag is included (it should contain the application version) using `git push --follow-tags`:
    - The semver is validated
    - The container image is built and pushed
    - The Helm chart is updated with the new version and copied to the `helm charts repository`
- If a tag is not included, it checks if the Helm chart is updated. If it is, it gets copied to the `helm charts repository`
- ArgoCD picks up the Helm changes from the `helm charts repository` and deploys it to the cluster

---

## what could be improved?

Here are some additional functionalities and improvements you could consider:

- Have pipeline scripts in a seperate repository that uploads them to S3/GCS and pipeline downloads them and executes them. This will allow for central management of pipeline scripts (this is parcial solution that makes increasing number of application repositories maintanace a bit easier).
- Different flows for different tags
- Adding an ingress to the Helm chart (you should have an ingress controller)
- Reducing the size of the container
- Scanning code for security issues / lint
- Adding more services
- Incorporating and running tests in the CI/CD pipeline

---

## Feedback, Questions and Contributions

Think something could be improved or have questions?<br>
Found an error or oversight?<br>
Feel free to open an issue or send a pull request.<br>