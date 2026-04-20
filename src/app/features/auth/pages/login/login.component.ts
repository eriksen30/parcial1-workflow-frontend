import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor completá todos los campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // TODO: reemplazar con llamada real al backend Spring Boot
    setTimeout(() => {
      this.isLoading = false;
      if (this.username === 'admin' && this.password === '1234') {
        // Guardar sesión
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    }, 1000);
  }
}
