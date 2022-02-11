# Deploying a NextJS app on Akash with SSL

This example shows how to use Docker with Next.js to deploy your app using the [Akash](https://akash.network) decentralized cloud marketplace. It also walks through setting up SSL on a custom domain for your site. Currently, you need to use a workaround for that, but the Akash team is working on a [native solution](https://akash.network/roadmap?feature=x-509-ssl-support).

## Contents

1. Prerequisites
1. Create NextJS app and Docker image
1. Deploy on Akash
1. Configure SSL

## Prerequisites

1. A NextJS app. Bootstrap using [npm](https://docs.npmjs.com/getting-started) or [Yarn](https://classic.yarnpkg.com/en/package/create-next-app), or use the code from the [`app`](https://github.com/OIGbash/nextjs-on-akash/app/) folder.
1. Public Docker repository. You can create a free account at [Docker Hub](https://hub.docker.com/).
1. More than 5 $AKT tokens. 5 tokens are required as escrow for your deployment, and it's a good idea to have a little more if you need to redeploy. 10 tokens would be more than enough. You can view places you can buy $AKT tokens [here](https://akash.network/token).
1. [Akashlytics deploy tool](https://www.akashlytics.com/deploy). The most streamlined way to deploy on Akash available currently.
1. A domain for your site.
1. A free [Cloudflare](https://dash.cloudflare.com/sign-up) account for enabling SSL.


## Create NextJS app and Docker image

### Create NextJS app

You will need a NextJS application that you want to deploy. You can bootstrap an example one using the following commands or use the example files located in the [`app`](https://github.com/OIGbash/nextjs-on-akash/tree/main/app) folder.

#### Option 1:
Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-docker nextjs-docker
# or
yarn create next-app --example with-docker nextjs-docker
```

#### Option 2:
Clone the files from the [`app`](https://github.com/OIGbash/nextjs-on-akash/tree/main/app) folder.

### Edit app

You can make some edits to the app by editing the [`index.js`](https://github.com/OIGbash/nextjs-on-akash/blob/main/app/pages/index.js) page.

### Build and push Docker image

1. Make sure you have [Docker installed](https://docs.docker.com/get-docker/) on your machine.
1. Make sure you are in the `app` directory and build the Docker container: `docker build -t nextjs-akash .`.
1. Push your container to Docker Hub. For more specific directions see [here](https://docs.docker.com/docker-hub/repos/).

## Deploy on Akash

1. Install the [Akashlytics wallet and deployment tool](https://www.akashlytics.com/deploy).
1. Create a wallet and make sure to write down the seed phrase in a secure location.
1. Fund your deployment account. Buy 6 or more $AKT tokens from one of the centralized or decentralized exchanges listed [here](https://akash.network/token) and send them to the Akashlytics wallet using the Akash address in the app.
1. Follow the app's workflow to create a certificate. You need to have a valid on-chain certificate to deploy on the Akash network.
1. Click on `CREATE DEPLOYMENT`. You will be guided through a four step process for creating your deployment.
1. Continue through step 1.
1. Choose `Empty` in step 2.
1. In step 3 you will see a text editor where you can enter a manifest. Your manifest is the set of directions you have for your deployment. The providers on the Akash network will use the resource requirements you define in your manifest to bid on your deployment and will use its directions to deploy your workload.
1. Copy the entire contents of the [`manifest.yaml`](https://github.com/OIGbash/nextjs-on-akash/manifest.yaml) file and paste it into the Akashlytics text editor. Change the templated image and domain values to the image you previously pushed to Docker hub and the domain you will use for your site, as below:
```bash
services:
  site:
    image: {your-username}/{image-name}
    expose:
      - port: 3000
        as: 80
        accept:
          - YOURDOMAIN.COM
        to:
          - global: true
```
Alternatively, you can use the image I've created for this deployment: oigbash/nextjs-on-akash.
![edit manifest](/images/edit-manifest.png)

1. Create your deployment, submit the transaction and wait for bids to come in.
Please note, as this is a marketplace, there are different providers with different levels of reliability and service. Choose and accept a bid, and the provider will deploy your app.
1. After a few seconds, you'll see a list of bids from different providers. You can see if the providers are enterprise-tier data centers or community-level contributors. Choose the provider that provides you the best value for your needs. That's the beauty of using Akash! Accept the bid, submit the transaction, and wait for the deployment.
1. After about 30 seconds, the deployment should be ready. You'll see a 1 in the "Available" field indicating that you have 1 live deployment. You'll also see the URL that the provider has generated for your deployment, as shown below. Take note of that link, as you'll need it to configure SSL. You can also follow that link to see your site, live over the Akash network!

![deployment details](/images/deployment-details.png)

If you have trouble with any of the above Akash deployment steps you can find more information on the Akashlytics deployment tool [here](https://docs.akash.network/guides/deploy) or on the [Akash Discord server](https://discord.gg/XaBNMkX5nn) or [Akashlytics Discord server](https://discord.gg/f46E78S3qw).

Congratulations, you've successfully deployed a site on the Akash network. Now, on to configuring SSL.

### Configure SSL

1. Set up a [free Cloudflare account](https://dash.cloudflare.com/sign-up) and add a site with your domain name.
1. Cloudflare will prompt you to set the DNS records. Create a CNAME record with `@` as the Name and your Akash deployment URL from the last step as the target, as pictured below:
![cloudflare dns](/images/cloudflare-dns.png)

1. Cloudflare will give you nameservers to use for your domain. Go to your domain provider and change the nameservers from the default ones to the ones given by Cloudflare. The nameservers can be found in Cloudflare's DNS tab.
![cloudflare ns](/images/cloudflare-nameservers.png)

1. Navigate to Cloudflare's SSL/TLS tab. Ensure that the Full option is checked, as pictured below:
![cloudflare ssl](/images/cloudflare-ssl.png)

1. Type your domain into your browser. You should see your site, deployed on Akash, with SSL enabled!

Congratulations! You're done. You've got a NextJS site deployed on Akash, with SSL enabled. That calls for a beer!
