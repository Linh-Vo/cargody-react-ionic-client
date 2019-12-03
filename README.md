# cargody-react-ionic-client

# run

ionic serve

# build android

ionic build && ionic capacitor add android

# update web code & resources to android platform
Update dependencies & copy web assets: npx cap sync (if any dependencies needs to update. For example: cordova-plugin-inappbrowser)
Copy web assets only: npx cap copy
# build apk unsigned

cd android

add new file local.properties: 

	- in Windows sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk

	- in macOS sdk.dir = /Users/USERNAME/Library/Android/sdk
			       
	- in linux sdk.dir = /home/USERNAME/Android/Sdk

./gradlew clean

./gradlew assembleRelease

# Create debug file:
cd android
window: gradlew installDebug

# Troubleshooting methods
https://capacitor.ionicframework.com/docs/android/troubleshooting/

# build apk signed

keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks ./android/app/build/outputs/apk/release/app-release-unsigned.apk my-alias

/path/to/Android/sdk/build-tools/VERSION/zipalign/

./zipalign -v 4 path\to\android\app\build\outputs\apk\release\app-release-unsigned.apk new\path\release.apk
