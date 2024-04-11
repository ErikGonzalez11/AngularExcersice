import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{
  // @Output() loggedIn = new EventEmitter<{ email: string, password: string }>();
  loginForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }
  
  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.userService.loginUser(email, password).subscribe(res => {
        if(res.length === 0){
          alert("No se encontro nada");
        }else{
          alert("Usuario encontrado")
          this.router.navigate(['/todo', email]);
        }
      });
    } else {
      console.log('Formulario inválido. Revise los campos.');
    }
  }
  
}
