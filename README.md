# cargody-react-ionic-client

#run
ionic serve

#build android
ionic build && ionic capacitor add android

#build apk unsigned
cd android
add new file local.properties: - in Windows sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk
                               - in macOS sdk.dir = /Users/USERNAME/Library/Android/sdk
                               - in linux sdk.dir = /home/USERNAME/Android/Sdk
./gradlew clean
./gradlew assembleRelease

#build apk signed
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks ./android/app/build/outputs/apk/release/app-releas 
e-unsigned.apk my-alias

