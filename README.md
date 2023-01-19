# bancaOnline
GIT PARA LA BANCA ONLINE GRUPO4
___
| Participantes  GRUPO 4|
|---------------|
|Javier Saez |
|Ander Caballero |
|Fatima Azza |
|Markel Rajado |
---


# Reto 4 - Despliegue


Bienvenidos, somos el **Grupo 4**, conformado por _Ander Caballero, Fatima Azza, Javier Saez_ y _Markel Rajado_. El día de hoy hemos creado una página basada en un banco oficial, y para subir dicha página a la WEB, os vamos a relatar los pasos que hemos seguido utilizando **GUEBS, GitHub y Cpanel**.

Lo primero de todo será crear una carpeta que más adelante subiremos como un clon en GitHub, siempre y cuando se haga en **repositorio privado**.


![image](https://user-images.githubusercontent.com/95285796/212898026-f769683e-1775-49ff-8080-94444a378282.png)

![image](https://user-images.githubusercontent.com/95285796/212898120-3753184d-07ff-47f3-98e2-b6bfb05c4fe7.png)

![image](https://user-images.githubusercontent.com/95285796/212898141-6f120ecb-c982-4254-a03b-469ff5a5b3c6.png)








Después, en nuestro servidor web, generaremos y asignaremos todo lo que se necesite en cuanto al **subdominio**. 
 
![image](https://user-images.githubusercontent.com/95285796/212898195-afeef8b1-2bdf-4072-9cd1-a8c191330a13.png)


Más tarde iremos hacia el **CPANEL**, y haremos _clic_ en la opción de _Git Version Control_.

![image](https://user-images.githubusercontent.com/95285796/212898207-0cd7ea3d-5714-4081-a4ac-14ebb33951e0.png)








Nos dirigiremos a _crear_ para clonar lo que allá en el repositorio de **GitHub**; y, allí dentro, asignaremos el clon (url de clonacion para el repositorio en nuestro caso por **ssh**), la ruta en la que acabará, y un nombre para este repositorio. 

_(Ten en cuenta que dependiendo de cómo se subió en un principio, ciertos segmentos de esta parte pueden ser diferentes)_

![image](https://user-images.githubusercontent.com/95285796/212898316-d85e265a-0f13-4e39-afe3-dae916a49d61.png)

![image](https://user-images.githubusercontent.com/95285796/212898328-5f7fc784-1948-42c8-a409-bc609b3a33a7.png)








Como paso más avanzado, necesitaremos convocar un fichero llamado _.cpanel.yml_. Este archivo permitirá que cada vez que se ejecuten cambios en GitHub, el servidor web los identifique y permita realizar los cambios a través de **Cpanel**. Claro está que, para que el fichero funcione, antes deberá ser rellenado con cierta información mediante comandos que limpien el servidor y copien los nuevos datos.

![image](https://user-images.githubusercontent.com/95285796/212898404-032473db-3910-49e6-b4c7-81d10c1b9bd1.png)

![image](https://user-images.githubusercontent.com/95285796/212898685-f95acc7c-48aa-445a-a41e-289bedbe062e.png)






Lo comandos que eliminan el contenido y lo sustituirían por otro serían los siguientes:

![image](https://user-images.githubusercontent.com/95285796/212898730-3914e4b0-844d-4f70-9eb6-d289dd4e8cfe.png)





Y por último, únicamente faltará ir a **CPANEL**, verificar los cambios cuando se hagan en la carpeta cuando haya sufrido un ***Commit and Push***, y hacer un ***DEPLOY HEAD Commit***. (_Cabe la posibilidad de que vaya lento, o que antes se necesite darle a la opción de_ ***Actualizar desde remoto***.)

![image](https://user-images.githubusercontent.com/95285796/212898756-c3a3304b-0c22-4d19-bfae-8ef7f7f31da5.png)

![image](https://user-images.githubusercontent.com/95285796/212898768-59ad6e8a-61d8-4b73-a692-f7eac3d93fcf.png)

![image](https://user-images.githubusercontent.com/95285796/212898800-5b924fa6-7f1b-4138-9d35-756ecee355c3.png)

![image](https://user-images.githubusercontent.com/95285579/213389207-22175620-ce18-41f4-b3d8-484bcd0a25c6.png)



De esa forma, la página ya estaría subida a la web

![image](https://user-images.githubusercontent.com/95285796/212898861-7a3f7afa-35c8-437c-ba66-0ac5d99dfcec.png)





# Reto 4 - Tecnologías

___
| Participantes  GRUPO 4|
|---|---------------|
|#1|ANGULAR |
|#2|JQUERY |
|#3|SASS |
|#4|HTML |
|#5|JAVASCRIPT |
|#6|PHP |
---


Obviamente, no nos olvidamos de crear una base de datos en phpMyAdmin.

