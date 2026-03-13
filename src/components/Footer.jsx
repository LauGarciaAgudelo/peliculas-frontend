function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-3 text-center">
        <small>
          Sistema de Gestión de Media | Ingeniería Web II | {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
}

export default Footer;