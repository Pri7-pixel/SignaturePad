import { Component, ViewChild } from '@angular/core';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { PointGroup } from 'signature_pad'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private history:PointGroup[]=[];
  private future:PointGroup[]=[];
  @ViewChild('signature')
  public signaturePad!:SignaturePadComponent;
  public signaturePadOptions:NgSignaturePadOptions = {
    minWidth:1,
    canvasWidth:400,
    canvasHeight:200,
    penColor:'black',
    backgroundColor: 'white',
    dotSize:1,
    maxWidth:1,
    velocityFilterWeight:1
  }

  clear(){
    this.history=[];
    this.future=[];
    this.signaturePad.clear();
  }

  undo(){
    var data = this.signaturePad.toData();
    if (data|| data==undefined){
      const lastStrock:any = this.history.pop();
      const removeStrock:any = data.pop();
      this.future.push(removeStrock);
      this.signaturePad.fromData(data);
    }
  }

  redo(){
    if (this.history.length>=0 && this.future.length>0){
      var data = this.signaturePad.toData();
      if (data|| data==undefined){
        const addData:any = this.future.pop();
        data.push(addData);
      }
      this.signaturePad.fromData(data);
    }
  }

  SavePNG(){
    if (this.signaturePad.isEmpty()){
      return alert('Please Provide A Signature First')
    }
    const data = this.signaturePad.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = 'signature.png';
    link.click();
  }

}
