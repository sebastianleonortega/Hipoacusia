import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  documents: Document[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.readDocument(file);
    } else {
      console.error('Formato de archivo no válido. Por favor, sube un archivo PDF.');
    }
  }

  readDocument(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      this.documents.push({ file, url });
    };
    reader.readAsDataURL(file);
  }

  showDocuments() {
    // Puedes implementar lógica adicional aquí si es necesario.
    // Por ahora, simplemente muestra los documentos en la consola.
    // console.log('Mostrar documentos:', this.documents);
  }

}


interface Document {
  file: File;
  url: string;
}
