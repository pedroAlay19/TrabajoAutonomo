import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { serviceApi, reviewApi } from '../../services/api/endpoints';
import type { MaintenanceService, RepairOrderReview } from '../../types';

export default function LandingPage() {
  const [services, setServices] = useState<MaintenanceService[]>([]);
  const [reviews, setReviews] = useState<RepairOrderReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      serviceApi.getAll().catch(() => []),
      reviewApi.getAll().catch(() => []),
    ]).then(([servicesData, reviewsData]) => {
      setServices(servicesData.filter(s => s.active !== false).slice(0, 6));
      setReviews(reviewsData.filter(r => r.rating >= 4).slice(0, 4));
      setLoading(false);
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-lg font-bold text-slate-100 transition-colors hover:text-blue-400"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span>TechService</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => scrollToSection('hero')}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Reseñas
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Contacto
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Registrarse</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="flex min-h-screen items-center pt-16">
        <div className="container-page py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-950/50 px-4 py-2 text-sm text-blue-300 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                </span>
                Servicio técnico profesional
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Reparación experta de
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  dispositivos electrónicos
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 md:text-xl">
                Diagnóstico preciso, reparación experta y seguimiento en tiempo real.
                Nuestros técnicos certificados devuelven la vida a tus equipos.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="shadow-lg shadow-blue-500/20">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Comenzar ahora
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="lg">Iniciar sesión</Button>
                </Link>
              </div>

              <div className="grid gap-6 pt-8 sm:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-slate-500">Dispositivos reparados</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-400">98%</div>
                  <div className="text-sm text-slate-500">Satisfacción del cliente</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-400">24h</div>
                  <div className="text-sm text-slate-500">Diagnóstico promedio</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">Diagnóstico rápido</div>
                      <div className="text-sm text-slate-400">En menos de 24 horas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">Garantía incluida</div>
                      <div className="text-sm text-slate-400">En todas las reparaciones</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">Seguimiento en tiempo real</div>
                      <div className="text-sm text-slate-400">Estado de tu reparación</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="border-t border-slate-800 bg-slate-950/40 py-20">
        <div className="container-page space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Nuestros servicios</h2>
            <p className="mt-2 text-slate-400">Soluciones especializadas para cada necesidad</p>
          </div>

          {loading ? (
            <div className="text-center text-slate-400">Cargando servicios...</div>
          ) : services.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id} hover>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-slate-100">
                        {service.serviceName}
                      </h3>
                      <span className="rounded bg-blue-900/40 px-2 py-1 text-sm font-medium text-blue-300">
                        ${service.basePrice}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{service.description}</p>
                    {service.estimatedTimeMinutes && (
                      <div className="text-xs text-slate-500">
                        ⏱️ Tiempo estimado: {Math.round(service.estimatedTimeMinutes / 60)}h
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-center text-slate-400">No hay servicios disponibles en este momento.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section id="reviews" className="container-page py-20">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Lo que dicen nuestros clientes</h2>
              <p className="mt-3 text-lg text-slate-400">Experiencias reales de clientes satisfechos</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'text-amber-400' : 'text-slate-700'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {review.comment && (
                      <p className="text-sm text-slate-300">"{review.comment}"</p>
                    )}
                    <div className="text-xs text-slate-500">
                      — {review.user?.name || 'Cliente verificado'}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="border-t border-slate-800 bg-slate-950/40 py-20">
        <div className="container-page">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Contáctanos</h2>
              <p className="mt-3 text-lg text-slate-400">Estamos aquí para ayudarte</p>
            </div>

            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-slate-200">Dirección</div>
                      <div className="text-sm text-slate-400">Av. Principal 123, Ciudad</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-slate-200">Horario</div>
                      <div className="text-sm text-slate-400">Lun–Vie: 9:00–18:00</div>
                      <div className="text-sm text-slate-400">Sáb: 10:00–14:00</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <div className="font-medium text-slate-200">Teléfono</div>
                      <div className="text-sm text-slate-400">+00 000 0000</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-slate-200">Email</div>
                      <div className="text-sm text-slate-400">contacto@techservice.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <div>
                      <div className="font-medium text-slate-200">Redes sociales</div>
                      <div className="text-sm text-slate-400">@techservice</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container-page text-center text-sm text-slate-500">
          © 2025 TechService. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
