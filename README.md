# Java testing with JUnit

# Getting started

1. [Install Java](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-macos.htm#JSJIG-GUID-C5F0BF25-3487-4F33-9275-7000C8E1C58C)
2. [Setup JAVA_HOME environment variable on Mac OS X](https://gist.github.com/fabianogoes/bf7aa20b007d8dda1ed2)
3. Check java version
```shell
$ java --version
java 15.0.2 2021-01-19
Java(TM) SE Runtime Environment (build 15.0.2+7-27)
Java HotSpot(TM) 64-Bit Server VM (build 15.0.2+7-27, mixed mode, sharing)
````
```shell
$ javac --version
javac 15.0.2
```
4 Compiling Java Code
```shell
$ javac -d bin -sourcepath src -cp .:lib/junit.jar src/CalculatorTest.java
```
5 Running Java Code
```shell
java -jar lib/junit.jar --cp bin/ -c CalculatorTest
```