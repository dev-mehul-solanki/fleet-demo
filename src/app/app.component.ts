import { Component } from '@angular/core';
import chroma from "chroma-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fleet-demo';
  colorName = '';
  colorList: any = [];
  constructor() {
  }
  onClickSubmit() {
    // To validate color name
    const valid = chroma.valid(this.colorName);
    let colorName = this.colorName;
    valid ? colorName :
      colorName = this.stringToColour(this.colorName);
    for (let i = 0; i < 7; i++) {
      this.colorList[i] = chroma(colorName).darken(i - Math.floor(7 / 2));
    }
  }
  // This function converts any string into hex code which are not supported by chroma js
  stringToColour(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
