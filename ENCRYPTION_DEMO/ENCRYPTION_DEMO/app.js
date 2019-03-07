(function () {
    var app = angular.module("eKYC", ['Network']);

    app.controller("Testing_Controller", ['$scope', 'network_service', testing_ctrl]);

    function testing_ctrl(scope, ns) {
        baseurl = "/api/Service/";

        ns.get(baseurl + "server_and_client_rsa_api", function (status, data) {
            var response = data;
            scope.CLIENT_PRIVATE_KEY = response.CLIENT_PRIVATE_KEY;
            scope.CLIENT_PUBLIC_KEY = response.CLIENT_PUBLIC_KEY;

            sessionStorage.setItem("CLIENT_PRIVATE_KEY", scope.CLIENT_PRIVATE_KEY);
            sessionStorage.setItem("CLIENT_PUBLIC_KEY", scope.CLIENT_PUBLIC_KEY);
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

            }, true);
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

            }, true);
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

            }, true);
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

            }, true);
        };



    }



})();