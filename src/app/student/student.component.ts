import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})


export class StudentComponent implements OnInit{
   
  @ViewChild('myModel') model: ElementRef | undefined;
  studentobj : studentModel = new studentModel();
  studentList : studentModel [] = [];
  ngOnInit(): void {
    this.getStudentList();
  }

  openModel() {
    let sdtmodel = document.getElementById('myModel');
    if (sdtmodel != null) {
      sdtmodel.style.display = 'block';
    }
  }

  closeModel(){
    this.studentobj = new studentModel();
    if(this.model !=null){
      this.model.nativeElement.style.display = 'none';
    }
  }

  onSaveform(){
    debugger;
    const localData = localStorage.getItem('studentdata');
    if(localData != null){
      const stdData = JSON.parse(localData);
      this.studentobj.id = stdData.length + 1;
      stdData.push(this.studentobj);
      localStorage.setItem('studentdata', JSON.stringify(stdData));
    }
    else{
      const newStudent = [];
      newStudent.push(this.studentobj);
      this.studentobj.id = 1;
      localStorage.setItem('studentdata', JSON.stringify(newStudent));
    }
    this.closeModel();
    this.getStudentList();
  }


  onUpdateform(){
    const currentStudent = this.studentList.find(s => s.id === this.studentobj.id);

    if(currentStudent != undefined){
      currentStudent.name = this.studentobj.name;
      currentStudent.mobile = this.studentobj.mobile;
      currentStudent.email = this.studentobj.email;
      currentStudent.gender = this.studentobj.gender;
      currentStudent.doj = this.studentobj.doj;
      currentStudent.address = this.studentobj.address;
      currentStudent.status = this.studentobj.status;
    }
    localStorage.setItem('studentdata', JSON.stringify(this.studentList));
    this.closeModel();
    this.getStudentList();
  }



  onDeleteStudent(data: studentModel) {
    const isConfirm = confirm('Are you sure you want to delete this Student Data?');
    
    if (isConfirm) {
      const studentIndex = this.studentList.findIndex(s => s.id === data.id);
      
      if (studentIndex !== -1) { // Ensure student exists
        this.studentList.splice(studentIndex, 1);
        localStorage.setItem('studentdata', JSON.stringify(this.studentList));
      } else {
        console.error('Student not found');
      }
    }
  }

  // oneleteStudent(data : studentModel){
  //   const isConfirm = confirm('Are you sure you want to delete this Student Data ?');
  //   if(isConfirm){
  //     const currentStudent = this.studentList.findIndex(s => s.id === this.studentobj.id);
  //     this.studentList.splice(currentStudent, 1);
  //     localStorage.setItem('studentdata', JSON.stringify(this.studentList));
  //   }
  // }

  onEditStudent(studentdata : studentModel){
    this.studentobj = studentdata;
    this.openModel();
  }


  getStudentList(){
    const localData = localStorage.getItem('studentdata')
    if(localData != null){
      this.studentList = JSON.parse(localData);
    }
  }
}

export class studentModel {
  id: number;
  name : string;
  mobile : string;
  email : string;
  gender : string;
  doj: string;
  address : string;
  status : boolean;

  constructor(){
    this.id = 0;
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.gender = "";
    this.doj = "";
    this.address = "";
    this.status = false
  }
}
