import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  joinDate: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  activeTab: 'info' | 'security' = 'info';
  isSaving = false;
  savedSuccess = false;
  showCurrentPassword = false;
  showNewPassword = false;

  profile: UserProfile = {
    name: 'Erik Sensano Bonilla',
    email: 'erik@empresa.com',
    role: 'Administrador',
    department: 'Tecnología',
    phone: '+591 76543210',
    joinDate: '2025-01-15',
  };

  editProfile: Partial<UserProfile> = { ...this.profile };

  passwordForm = {
    current: '',
    newPass: '',
    confirm: '',
  };

  passwordError = '';
  passwordSuccess = false;

  departments = [
    'Tecnología',
    'Recursos Humanos',
    'Legal',
    'Administración',
    'Finanzas',
  ];

  constructor(private router: Router) {}

  get initials() {
    return this.profile.name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('');
  }

  saveProfile() {
    if (!this.editProfile.name || !this.editProfile.email) return;
    this.isSaving = true;

    // TODO: conectar con PUT /api/auth/profile del backend
    setTimeout(() => {
      this.profile = { ...this.profile, ...this.editProfile };
      this.isSaving = false;
      this.savedSuccess = true;
      setTimeout(() => (this.savedSuccess = false), 3000);
    }, 800);
  }

  changePassword() {
    this.passwordError = '';
    this.passwordSuccess = false;

    if (!this.passwordForm.current) {
      this.passwordError = 'Ingresá tu contraseña actual.';
      return;
    }
    if (this.passwordForm.newPass.length < 6) {
      this.passwordError =
        'La nueva contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.passwordForm.newPass !== this.passwordForm.confirm) {
      this.passwordError = 'Las contraseñas no coinciden.';
      return;
    }

    // TODO: conectar con PUT /api/auth/password del backend
    setTimeout(() => {
      this.passwordSuccess = true;
      this.passwordForm = { current: '', newPass: '', confirm: '' };
      setTimeout(() => (this.passwordSuccess = false), 3000);
    }, 800);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/auth/login']);
  }
}
