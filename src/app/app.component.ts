import { Component} from '@angular/core';



declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {


  }
getUrl() {
  return 'url("../assets/imagenes/fotos-perfil-whatsapp_13.jpg")';
}
  }
