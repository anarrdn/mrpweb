docker login registry.fibo.cloud -p fibo123 -u fibo
docker buildx build --platform=linux/amd64 --no-cache -t registry.fibo.cloud/techpartners/teso/zahii/prod_customer:v2 .
docker push registry.fibo.cloud/techpartners/teso/zahii/prod_customer:v2