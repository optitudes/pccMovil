# PCC Aplicativo Movil (Distribuciones Basadas en Debian)

Para la instalacion del entorno de ejecucucion del nuestra APP debemos instalar las siguientes herramientas:

## ADB(Android Debuger)

Para la instalacion de este componente se deben ejecutar los siguientes comandos en la terminal de un sistema Operativo tipo Unix
```
$ export ANDROID_HOME=$HOME/Android/Sdk
```
```
$ export PATH=$PATH:$ANDROID_HOME/emulator
```
```
$ export PATH=$PATH:$ANDROID_HOME/platform-tools
```
## WATCHMAN

Para la instalacion de WatchMan puede descargar el ejecutable del siguiente Repositorio
<p>Este es <a href="http://example.com/" title="Title">
El Repositorio </a> Ingrese al link.</p>

Si contamos con los repositorios ejecutar el comando.

```
$ sudo apt-get install watchman
```
## Instalacion de Java.

```
$ sudo apt install -y default-jdk
```
```
$ sudo apt install -y default-jre
```
Edite el documento /etc/environment y agrege JAVA_HOME=/usr/lib/jvm/default-java

```
$ sudo nano /etc/etc/environment

JAVA_HOME=/usr/lib/jvm/default-java
```
Verificar el contenido de la variable de entorno $JAVA_HOME

```
$ source /etc/environment
```
```
$ echo $JAVA_HOME
```
## Instalacion de Node
En la instalacion de la herramienta Node debemos prestar atencion en la version, ya que necesitamos la version 15.

Para poder seleccionar la version que necesitamos se debe instalar la herramienta NVM.
```
$ sudo apt install nvm 
```

En el home del usuario en el archivo .bashrc apuntaremos al script del nvm.

```
$ echo 'source /usr/share/nvm/init-nvm.sh' >> ~/.bashrc
```
```
$ source .bashrc
```
```
$ nvm --version
```
El ultimo comando debe retornar la Version.

Se debe proceder a instalar el node 15

```
$ nvm ls-remote && nvm install v15
```
Definamos el alias y la asiganacion por defecto 
```
$ nvm use v15 && alias default v15
```
Verificar la version del node.

```
$ node -v
```

## Instalacion de las dependencias de React.
```
$ npm install && npm i metro-react-native-babel-preset && npm i react-native-document-picker && npm i react-native-encrypted-storage && npm i
```

## Instalacionde Android Studio
Se debe elegir un SDK entre 28 y 31
En el siguiente link puede descargar el ejecutable para instalar la herramienta.
<p>Este es <a href="https://developer.android.com/studio?gclid=Cj0KCQiAm4WsBhCiARIsAEJIEzUONxhXFsw95iKAxW_ppXrEtlkVOaSzZB-54-uyBcBR0l5KCzdDJDkaAhQLEALw_wcB&gclsrc=aw.ds&hl=es-419" title="Title">
El IDE  </a> Ingrese al link.</p>

## Ejecutar Proyecto.
En una terminal ubicarce en el directorio del proyecto y ejecutar el servicio de npm:

```
$ npm start
```
En otra terminal ejecutar el emulador de Android.

```
$ npm run android
```











 
