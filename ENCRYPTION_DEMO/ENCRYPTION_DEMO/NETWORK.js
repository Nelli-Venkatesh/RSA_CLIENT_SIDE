/*
 Author  : Venkatesh Nelli
 Version : 3.0
 License : GNU General Public License v3.0
 */

//Network JS Main Code
(function () {

    // 'use strict';

    var app = angular.module('Network', []);
    app.service('network_service', ['$http', network]);

    function network(http) {

        var web_site = location.hostname;

        var pre_path = "";
        if (web_site != "localhost") {
            pre_path = "/" + location.pathname.split("/")[1];
        }

        var end_encrypt_post = function (url_path, data_object, public_key, private_key, success_callback, failure_callback, return_encrypt = true) {

            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }

            var string_data_object = JSON.stringify(data_object);

            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            //RSA Encryption
            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            // Import the RSA Key information.
            rsa.FromXmlString(new_public_key);
            // Encrypt byte array. and for  OAEP padding (PKCS#1 v2) second parameter is true.
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            // Convert bytes to base64 string.
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);


            var data = encryptedString + "." + encrypted_data;

            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).then(function (success) {


                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
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

                    success_callback(success.status, decrypted_data, success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var end_encrypt_get = function (url_path, data_object, public_key, private_key, success_callback, failure_callback, return_encrypt = true) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }


            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var string_data_object = JSON.stringify(data_object);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            //RSA Encryption
            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            // Import the RSA Key information.
            rsa.FromXmlString(new_public_key);
            // Encrypt byte array. and for  OAEP padding (PKCS#1 v2) second parameter is true.
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            // Convert bytes to base64 string.
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);

            var post_url = encryptedString + "." + encrypted_data;


            http({
                method: 'GET',
                url: pre_path + url_path + "?data=" + post_url
            }).then(function (success) {


                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
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

                    success_callback(success.status, decrypted_data, success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_encrypt_post = function (url_path, data_object, public_key, private_key, token, success_callback, failure_callback, return_encrypt = true) {

            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }
            if (token == "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }
            var string_data_object = JSON.stringify(data_object);

            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            //RSA Encryption
            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            // Import the RSA Key information.
            rsa.FromXmlString(new_public_key);
            // Encrypt byte array. and for  OAEP padding (PKCS#1 v2) second parameter is true.
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            // Convert bytes to base64 string.
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);


            var data = token + "." + encryptedString + "." + encrypted_data;

            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).then(function (success) {


                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
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

                    success_callback(success.status, decrypted_data, success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_encrypt_get = function (url_path, data_object, public_key, private_key, token, success_callback, failure_callback, return_encrypt = true) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }
            if (token == "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }

            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var string_data_object = JSON.stringify(data_object);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            //RSA Encryption
            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            // Import the RSA Key information.
            rsa.FromXmlString(new_public_key);
            // Encrypt byte array. and for  OAEP padding (PKCS#1 v2) second parameter is true.
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            // Convert bytes to base64 string.
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);

            var post_url = token + "." + encryptedString + "." + encrypted_data;


            http({
                method: 'GET',
                url: pre_path + url_path + "?data=" + post_url
            }).then(function (success) {

                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
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

                    success_callback(success.status, decrypted_data, success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }

            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var encrypt_post = function (url_path, data_object, KEY, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (KEY == "" || KEY == undefined || KEY == null) {
                alert("Token should not be empty !!!");
                return;
            }

            var payload = JSON.stringify(data_object);
            var number = CryptoJS.enc.Utf8.parse(KEY);
            var data = CryptoJS.enc.Utf8.parse(payload);
            var hash = CryptoJS.HmacSHA256(data, number);
            var signature = CryptoJS.enc.Base64.stringify(hash);
            var data_1 = CryptoJS.enc.Utf8.parse(signature);
            var data_to_sent = base64url(number) + "." + base64url(data) + "." + base64url(data_1);

            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data_to_sent)
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var encrypt_get = function (url_path, data_object, KEY, success_callback, failure_callback) {

            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (KEY == "" || KEY == undefined || KEY == null) {
                alert("Token should not be empty !!!");
                return;
            }

            var payload = JSON.stringify(data_object)
            var number = CryptoJS.enc.Utf8.parse(KEY);
            var data = CryptoJS.enc.Utf8.parse(payload);
            var hash = CryptoJS.HmacSHA256(data, number);
            var signature = CryptoJS.enc.Base64.stringify(hash);
            var data_1 = CryptoJS.enc.Utf8.parse(signature);
            var post_url = base64url(number) + "." + base64url(data) + "." + base64url(data_1);

            http({
                method: 'GET',
                url: pre_path + url_path + "?data=" + post_url
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });

        };

        var post = function (url_path, data_object, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data_object)
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var get = function (url_path, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }

            http({
                method: 'GET',
                url: pre_path + url_path
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_post = function (url_path, data_object, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: data_object,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_get = function (url_path, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }

            http({
                method: 'GET',
                url: pre_path + url_path,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var access_post = function (url_path, data_object, token, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object != "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (token != "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data_object),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'contentType': 'application/json'
                }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var access_get = function (url_path, token, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }

            if (token == "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }
            http({
                method: 'GET',
                url: pre_path + url_path,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'contentType': 'application/json'
                }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var custom_post = function (url_path, data_object, headers, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (headers == "" || headers == undefined || headers == null) {
                alert("Header should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data_object),
                headers: headers
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var custom_get = function (url_path, headers, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (headers == "" || headers == undefined || headers == null) {
                alert("Header should not be empty !!!");
                return;
            }
            http({
                method: 'GET',
                url: pre_path + url_path,
                headers: headers
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        network = {
            token_encrypt_post: token_encrypt_post,
            token_encrypt_get: token_encrypt_get,
            end_encrypt_get: end_encrypt_get,
            end_encrypt_post: end_encrypt_post,
            encrypt_get: encrypt_get,
            encrypt_post: encrypt_post,
            post: post,
            get: get,
            token_post: token_post,
            token_get: token_get,
            access_post: access_post,
            access_get: access_get,
            custom_post: custom_post,
            custom_get: custom_get
        };

        return network;

    }

}());

