# RSA_CLIENT_SIDE
Encryption of data using RSA Encryption with different key sizes and uses token based Authentication and JWT style signature verification.

### Example
``` markdown
  scope.rsa_get = function () {
            var req = {
                ID: "1",
                NAME: "Hello This is Venkatesh Nelli"
            };
            ns.end_encrypt_get(baseurl + "get_Test", req, scope.CLIENT_PUBLIC_KEY, scope.CLIENT_PRIVATE_KEY, function (status, data) {
                console.log(status);
                console.log(data);
            }, function (status, data) {
            }, true);
        };
 ```

### Usage

First Generate a public and key private key using the server side library and store it in the session and for token athentication generate token and save it in the session.

 In the above method 1st parameter of end_encrypt_get is the URL and second parameter is data which should be in JSON and third and fourth parameters are public and private keys for RSA encryption and 5th and 6th parameters are success and failure callback functions and last one is boolean value when it should be true when server side sending data is encrypted and false when sending normal data from server.
 
In the callback functions staus is the http statuscode and data is the response data.


 You can find server side encryption and decryption in another github repository [SERVER SIDE RSA WITH EXAMPLE SOLUTION](https://github.com/Venkatesh-Nelli/RSA_SERVER_SIDE)


### Support or Contact
For any issues in the code please raise an issue or mail me for any other information. 
