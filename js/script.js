var PhotoBoothApp = angular.module( 'PhotoBoothApp', [ 'ngMaterial' ] )

PhotoBoothApp.controller('CameraController', function CameraController($scope, $mdDialog){
    var photobooth = require("webcamjs");
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport('smtps://m.mounir.f%40gmail.com:lpl]lkdv4ldwghp4Ever2gether@smtp.gmail.com');


    angular.element(document).ready(function () {
        photobooth.set({
            width: 320,
            height: 240,
            dest_width: 640,
            dest_height: 480,
            image_format: 'jpeg',
            jpeg_quality: 100,
            force_flash: false,
            flip_horiz: true,
            fps: 45
        });
        photobooth.attach('.cameraWrapper');
    });

    $scope.capture = function() {
        photobooth.snap( function(data_uri) {
            $scope.image = data_uri;
            $mdDialog.show({
              controller: CameraController,
              contentElement: '#imageDialog',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose: true
            });
        });
    };


    var sendTo = $scope.emailInput;
    var subject = "from photobooth";
    var sendFrom = "M.Mounir <info@mounirdesigns.com>";
    var image = $scope.image;

    var mail = {
        from: sendFrom,
        to: sendTo,
        subject: "Send Email Using Node.js",
        text: "Node.js New world for me",
        html: "<b>Node.js New world for me</b>"
    }

    $scope.sendEmail = function(){
        console.log("sending...");
        if($scope.sendImageForm.$invalid){
            console.log("error");
        }

        else{
            transporter.sendMail(mail, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        }
    }

});
