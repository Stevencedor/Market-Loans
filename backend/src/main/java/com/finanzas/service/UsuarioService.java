package com.finanzas.service;

import com.finanzas.model.Usuario;
import com.finanzas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(Usuario usuario) {
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByUsername(String username) { // Cambiado de buscarPorUsername a findByUsername
        return usuarioRepository.findByUsername(username);
    }

    public Usuario updateUsuario(String username, Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con username: " + username));

        // Actualizar solo los campos permitidos
        usuario.setNombre(usuarioDetails.getNombre());
        // No permitimos cambiar el email o username directamente desde aquí por simplicidad,
        // pero podría implementarse con validaciones adicionales.
        // usuario.setEmail(usuarioDetails.getEmail()); 
        // usuario.setUsername(usuarioDetails.getUsername());

        return usuarioRepository.save(usuario);
    }

    public void changePassword(String username, String currentPassword, String newPassword) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(currentPassword, usuario.getPassword())) {
            throw new BadCredentialsException("La contraseña actual es incorrecta");
        }

        if (newPassword == null || newPassword.length() < 6) {
            throw new IllegalArgumentException("La nueva contraseña debe tener al menos 6 caracteres.");
        }

        usuario.setPassword(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);
    }
}