# GitOps CI/CD with Bitbucket Pipelines for a Simple TypeScript (Node.js) Application

This is one of exploratory project to dive into DevOps practices.

---

## what's Involved:

- A Kubernetes (k8s) cluster (validated on remote, but should also be operable locally)
- ArgoCD installed in the cluster
- A container image repository
- A Bitbucket repository to host Helm charts for all applications (`helm-charts-repository`)
- A Bitbucket repository containing the TypeScript code, along with the application Helm chart, which gets copied over to the central Helm charts repository (`application-repository`)

---

## workflow:

When you update your code and push in `application-repository`, the CI/CD pipeline will:

- If a tag is included (it should contain the application version) using `git push --follow-tags`:
    - The semver is validated
    - The container image is built and pushed
    - The Helm chart is updated with the new version and copied to the `helm-charts-repository`
- If a tag is not included, it checks if the Helm chart is updated. If it is, it gets copied to the `helm-charts-repository`
- ArgoCD picks up the Helm changes from the `helm-charts-repository` and deploys it to the cluster

---

## wish plan:

There are many more functionalities and changes that can be added to experiment with different ideas:

- Different flows for different tags
- Adding an ingress to the Helm chart (you should have an ingress controller)
- Reducing the size of the container
- Scanning code for security issues / lint
- Adding more services
- Incorporating and running tests in the CI/CD pipeline
- Fixing `application-repository` ci/cd to save version changes to local helm chart

---

## ehm...

Think something could or should be done better?<br>
Have questions?<br>
Found something stupid ive done or something simple i overlooked?<br>
Feel free to open an issue, send pull request or whatever<br>