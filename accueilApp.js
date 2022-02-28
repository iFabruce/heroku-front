;(function() 
{
    function authInterceptor($window) 
    {
        return {
            request: function(config) 
            {
                if ($window.localStorage['jwtToken']) 
                {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage['jwtToken'];
                }
                return config;
            }
        }
    }

    function myCtrl($window,$scope,$http,$filter) 
    {
        $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(resultat) 
        {
            var tab = [];
            for(var i = 0 ; i < resultat.data.length ; i++)
            {
                tab.push(resultat.data[i].nom);
            }
            $scope.typenames = tab;
        },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });

        $scope.print = function()
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsable/' + response.data.id).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                        $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printStatus = function(status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableStatus/' + response.data.id + '/'+status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) { this.openPopup();})
                                    .addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printDatemax = function(datemax)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableDatemax/' + response.data.id + '/' + datemax).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printDatemin = function(datemin)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableDatemin/' + response.data.id + '/' + datemin).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printType = function(type)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableType/' + response.data.id + '/' + type).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printDatemaxStatus = function(datemax,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableDatemaxStatus/' + response.data.id + '/' + datemax + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printDateminStatus = function(datemin,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableDateminStatus/' + response.data.id + '/' + datemin + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeStatus = function(type,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeStatus/' + response.data.id +'/'+ type + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeDatemax = function(type,datemax)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeDatemax/' + response.data.id + '/' + type + '/' + datemax).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printDateminDatemax = function(datemin,datemax)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableDateminDatemax/' + response.data.id + '/' + datemin + '/' + datemax ).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeDatemin = function(type,datemin)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeDatemin/' + response.data.id + '/'+ type +'/'+datemin).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printDateminDatemaxStatus = function(datemin,datemax,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableDateminDatemaxStatus/' + response.data.id + '/' + datemin + '/' + datemax + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                        $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeDatemaxStatus = function(type,datemax,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeDatemaxStatus/' + response.data.id +'/'+type + '/' + datemax + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeDateminStatus = function(type,datemin,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeDateminStatus/' + response.data.id + '/' + type + '/' + datemin + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeDateminDatemax = function(type,datemin,datemax)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeDateminDatemax/' + response.data.id + '/' + type + '/' + datemin + '/' + datemax).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                       $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.printTypeDateminDatemaxStatus = function(type,datemin,datemax,status)
        {
            map.remove();
            document.getElementById('right').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            $http.get('https://heroku-ws-cloud.herokuapp.com/v1/types').then(function successCallback(result) 
            {
                var tab = result.data;
                $http.get('https://heroku-ws-cloud.herokuapp.com/v1/personneEmail?email=' + JSON.parse($window.atob($window.localStorage['jwtToken'].split('.')[1].replace('-', '+').replace('_', '/'))).sub).then(function successCallback(response) 
                {
                     console.log(response.data);
                    $http.get('https://heroku-ws-cloud.herokuapp.com/v1/listByResponsableTypeDateminDatemaxStatus/' + response.data.id + '/' + type + '/' + datemin + '/' + datemax + '/' + status).then(function successCallback(res) 
                    { 
                        var map = L.map('map',{ center: [-18.777192,46.854328],zoom: 5 }); $scope.value =  res.data;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Signalement' }).addTo(map);
                        $scope.gogol = []
                        for(var i = 0 ; i < res.data.length ; i++)
                        {
                            for(var u = 0 ; u < tab.length ; u++)
                            {
                                if (tab[u].id == res.data[i].idType)
                                {
                                    var temp = res.data[i];
                                    temp.nomtype = tab[u].nom;
                                    temp.couleur = tab[u].couleur;
                                    $scope.gogol.push(temp);
                                    L.marker([res.data[i].latitude,res.data[i].longitude], {icon:L.divIcon({className: "box",iconAnchor: [12,25],labelAnchor: [-6,0],popupAnchor: [0,-15],html: '<span style="background-color:'+ tab[u].couleur +';width: 10px;height: 10px;font-size:15px;display: block; border-radius:5em 5em 5em 5em " ></span>'})})
                                    .bindPopup('<h1>'+tab[u].nom+'</h1><h3>'+res.data[i].description+'</h3><h2>'+res.data[i].dateHeure+'</h2><a href="fiche.html?id='+res.data[i].id+'">Detail</a>').on('mouseover', function (e) {this.openPopup(); }).addTo(map);
                                    break;
                                }
                            }
                        }
                    },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
                },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
            },function errorCallback(response) { if (response.status == 401) { $window.location.href = 'login.html' } });
        }

        $scope.print();
        $scope.go = function()
        {
            var type = $scope.type;
            var datemin = $filter('date')($scope.datemin,"yyyy-MM-dd");
            var datemax = $filter('date')($scope.datemax,"yyyy-MM-dd");
            var status = $scope.status;
            
            if(type == null  && datemin == null && datemax == null && status == null)
            {
                $scope.print();
            }
            else if (type == null  && datemin == null && datemax == null && status != null)
            {
                $scope.printStatus(status);
            }
            else if (type == null  && datemin == null && datemax != null && status == null)
            {
                $scope.printDatemax(datemax);
            }
            else if (type == null  && datemin != null && datemax == null && status == null)
            {
                $scope.printDatemin(datemin);
            }
            else if (type != null  && datemin == null && datemax == null && status == null)
            {
                $scope.printType(type);
            }
            else if (type == null  && datemin == null && datemax != null && status != null)
            {
                $scope.printDatemaxStatus(datemax,status);
            }
            else if (type == null  && datemin != null && datemax == null && status != null)
            {
                $scope.printDateminStatus(datemin,status);
            }
            else if (type != null  && datemin == null && datemax == null && status != null)
            {
                $scope.printTypeStatus(type,status);
            }
            else if (type != null  && datemin == null && datemax != null && status == null)
            {
                $scope.printTypeDatemax(type,datemax);
            }
            else if (type == null  && datemin != null && datemax != null && status == null)
            {
                $scope.printDateminDatemax(datemin,datemax);
            }
            else if (type != null  && datemin != null && datemax == null && status == null)
            {
                $scope.printTypeDatemin(type,datemin);
            }
            else if (type == null  && datemin != null && datemax != null && status != null)
            {
                $scope.printDateminDatemaxStatus(datemin,datemax,status);
            }
            else if (type != null  && datemin == null && datemax != null && status != null)
            {
                $scope.printTypeDatemaxStatus(type,datemax,status);
            }
            else if (type != null  && datemin != null && datemax == null && status != null)
            {
                $scope.printTypeDateminStatus(type,datemin,status);
            }
            else if (type != null  && datemin != null && datemax != null && status == null)
            {
                $scope.printTypeDateminDatemax(type,datemin,datemax);
            }
            else if (type != null  && datemin != null && datemax != null && status != null)
            {
                $scope.printTypeDateminDatemaxStatus(type,datemin,datemax,status);
            }
        }

    }
    angular.module('myApp',[]).factory('authInterceptor', authInterceptor).config(function($httpProvider) { $httpProvider.interceptors.push('authInterceptor'); }).controller('main', myCtrl)
})();