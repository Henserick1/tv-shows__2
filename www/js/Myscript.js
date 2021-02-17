// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDqJ5cP10StCzFUawZbHuAAqnYbpd_H_nU",
  authDomain: "fir-connection-c8267.firebaseapp.com",
  databaseURL: "https://fir-connection-c8267-default-rtdb.firebaseio.com",
  projectId: "fir-connection-c8267",
  storageBucket: "fir-connection-c8267.appspot.com",
  messagingSenderId: "915247671101",
  appId: "1:915247671101:web:4e606336228b1f447d4754"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var series = firebase.database().ref('serie');


recargarTabla();

function recargarTabla(){
  var dataSerie =[];
  var filas = "";
      firebase.database().ref('serie').once('value', function(data){
          data.forEach(function(serie){
              var ser = new Serie();
              ser.key = serie.key;
              ser.title = serie.val().title;
              ser.network = serie.val().network;
              ser.numberOfSeasons = serie.val().numberOfSeasons;
              ser.isCurrent = serie.val().isCurrent;
              ser.genres = serie.val().genres;

              dataSerie.push(ser);
              
              
          });

          
          for(var i = 0; i < dataSerie.length;i++){
            filas+="<tr>";
            filas+="<td>";
            filas+=dataSerie[i].title;
            filas+="</td>";
            filas+="<td>";
            filas+=dataSerie[i].network;
            filas+="</td>";
            filas+="<td>";
            filas+=dataSerie[i].numberOfSeasons;
            filas+="</td>";
            filas+="<td>";
  
            if(dataSerie[i].isCurrent == true){
              filas+="Yes";
            }else{
              filas+="No";
            }
  
            filas+="</td>";
            filas+="<td>";
            filas+=dataSerie[i].genres;
            filas+="</td>";
            
            // filas+="<td>"
            // filas+="<button type='button' class='btn btn-danger' onclick=\"eliminar(\'"+dataSerie[i].key+"\')\">Eliminar</button>";
            // filas+="</td>"
            filas+="</tr>";
            
          }
          document.getElementById('tablaAdd').innerHTML = filas;  
           
        });
  }

// function eliminar(key){
//   firebase.database().ref("serie").child(key).remove();
//   recargarTabla();
// }

function nuevaSerie(){
  $('#myModal').modal('show');
}

function agregarSerie(){

  var nTitle = $('#addTitle').val();
  var nNetwork = $('#addNetwork').val();
  var nGenres = $('#addGenres').val();
  var nNSeasons = $('#addNSeasons').val();
  if(document.getElementById('addCurrent').checked){
    var nCurrent = true;
  }else{
    var nCurrent = false;
  }
  
  
  if(nTitle != "" && nNetwork != "" && nGenres != "" && nNSeasons > 0 ){
    let nuevaSerie = series.push();
    nuevaSerie.set({
      title : nTitle,
      network : nNetwork,
      numberOfSeasons : nNSeasons,
      isCurrent : nCurrent,
      genres : nGenres,
    });
    nuevaSerie.on('value', (snapshot)=>{
      recargarTabla();
    });
  }
  $('#myModal').modal('hide');
}

class Serie{
  key;
  title;
  network;
  isCurrent;
  numberOfSeasons;
  genres;
  constructor(){
    this.key = "";
    this.title = "";
    this.network = "";
    this.isCurrent = false;
    this.numberOfSeasons = 0;
    this.genres = "";
  }
}

  




  
