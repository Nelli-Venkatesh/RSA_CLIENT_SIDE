(function () {
    var app = angular.module("eKYC", ["ngRoute", 'Network', 'Session', 'input_masking']);

    app.controller("Testing_Controller", ['$scope', 'network_service', 'session_service', testing_ctrl]);

    function testing_ctrl(scope, ns, session) {
        baseurl = "/api/eKYC_Reports_Yuva_Nestham/";

        ns.get(baseurl + "server_and_client_rsa_api", function (status, data) {

            var response = data;
            scope.CLIENT_PRIVATE_KEY = response.CLIENT_PRIVATE_KEY;
            scope.CLIENT_PUBLIC_KEY = response.CLIENT_PUBLIC_KEY;

            sessionStorage.setItem("CLIENT_PRIVATE_KEY", scope.CLIENT_PRIVATE_KEY);
            sessionStorage.setItem("CLIENT_PUBLIC_KEY", scope.CLIENT_PUBLIC_KEY);


            /*
                        console.log(response);
            
                        var text_data = "Hello This is venkatesh Nelli";
            
            
                        var key_value = random_key_generator(16);
                        var iv_value = random_key_generator(16);
            
                        var encrypted_data = Encrypt_Data(text_data, key_value, iv_value);
            
                        var key_value_pair = {
                            KEY: key_value,
                            IV: iv_value
                        };
            
            
                        //RSA Encryption
                        var new_public_key = scope.CLIENT_PUBLIC_KEY;
            
                        var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
                        rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
                        // Import the RSA Key information.
                        rsa.FromXmlString(new_public_key);
                        // Encrypt byte array. and for  OAEP padding (PKCS#1 v2) second parameter is true.
                        var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
                        // Convert bytes to base64 string.
                        var encryptedString = System.Convert.ToBase64String(encryptedBytes);
                        console.log("RSA_ENCRYPTION : ", encryptedString);
                        console.log("AES_ENCRYPTION : ", encrypted_data);
            
                        var final_data = (encryptedString) + "." + (encrypted_data);
            
                        console.log(final_data);
            
                        ns.get(baseurl + "Test?data=" + final_data, function (status, data) {
            
                            var response = data;
            
                            console.log(response);
            
                            var data_array = response.split('.');
            
                            var new_private_key = scope.CLIENT_PRIVATE_KEY;
                            encryptedBytes = System.Convert.FromBase64String(data_array[0]);
                            // Create a new instance of RSACryptoServiceProvider.
                            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
                            // Import the RSA Key information. 
                            rsa.FromXmlString(new_private_key);
                            // Decrypt byte array. and for  OAEP padding (PKCS#1 v2) second parameter is true.
                            decryptedBytes = rsa.Decrypt(encryptedBytes, true);
                            // Get decrypted data.
                            var key_pair = System.Text.Encoding.UTF8.GetString(decryptedBytes);
            
                            var key_iv_pair = JSON.parse(key_pair);
            
                            var decrypted_data = Decrypt_Data(data_array[1], key_iv_pair.KEY, key_iv_pair.IV);
            
                            console.log(decrypted_data);
            
                        });
            */


        });

        ns.get(baseurl + "get_token", function (status, data) {
            scope.token = data.access_token;
            sessionStorage.setItem("token", scope.token);
            console.log(scope.token);
        }, function (status, data) {
            console.log(status);
            console.log(data);
        });

        scope.rsa_token_get = function () {
            var req = {
                ID: "1",
                NAME: "Hello This is Venkatesh Nelli"
            };
            var token = sessionStorage.getItem("token");
            ns.token_encrypt_get(baseurl + "get_Token_Test", req, scope.CLIENT_PUBLIC_KEY, scope.CLIENT_PRIVATE_KEY, token, function (status, data) {
                console.log(status);
                console.log(data);
            }, function (status, data) {

            }, false);
        };
        scope.rsa_token_post = function () {
            var req = {
                ID: "1",
                NAME: "Hello This is Venkatesh Nelli"
            };
            var token = sessionStorage.getItem("token");
            ns.token_encrypt_post(baseurl + "post_Token_Test", req, scope.CLIENT_PUBLIC_KEY, scope.CLIENT_PRIVATE_KEY, token, function (status, data) {
                console.log(status);
                console.log(data);
            }, function (status, data) {

            }, false);
        };

        scope.rsa_get = function () {
            var req = {
                ID: "1",
                NAME: "Hello This is Venkatesh Nelli"
            };
            ns.end_encrypt_get(baseurl + "get_Test", req, scope.CLIENT_PUBLIC_KEY, scope.CLIENT_PRIVATE_KEY, function (status, data) {
                console.log(status);
                console.log(data);
            }, function (status, data) {

            }, false);
        };


        scope.rsa_post = function () {
            var req = {
                ID: "1",
                NAME: "Hello This is Venkatesh Nelli"
            };
            ns.end_encrypt_post(baseurl + "post_Test", req, scope.CLIENT_PUBLIC_KEY, scope.CLIENT_PRIVATE_KEY, function (status, data) {
                console.log(status);
                console.log(data);
            }, function (status, data) {

            }, false);
        };



    }



})();