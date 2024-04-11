import { StackContext, Api, EventBus, StaticSite, Bucket } from "sst/constructs";

export function API({ stack }: StackContext) {
  const assetsBucket = new Bucket(stack, "assets");

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        }
      }
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /birds": "packages/functions/src/birds.handler",
      "POST /birds": "packages/functions/src/birds.handler",
      "POST /signed-url": {
        function: {
          environment: {
            ASSETS_BUCKET_NAME: assetsBucket.bucketName,
          },
          handler: "packages/functions/src/s3.handler",
        }
      }
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteUrl: web.url,
  });
}
