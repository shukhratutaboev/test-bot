FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY . .
RUN dotnet restore TestBot.csproj

# copy and publish app and libraries
RUN dotnet publish TestBot.csproj -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
# For Heroku
CMD cp /root/.microsoft/usersecrets/fond-secrets/secrets.json /app/appsettings.json && ASPNETCORE_URLS="http://+:80;" dotnet TestBot.dll