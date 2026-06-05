'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type VisitUsMapProps = {
  lat: number;
  lng: number;
};

export function VisitUsMap({ lat, lng }: VisitUsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    void (async () => {
      const L = await import('leaflet');

      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([lat, lng], 16);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: 'visit-us-map-marker',
        html: '<span class="visit-us-map-marker__dot" aria-hidden="true"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker([lat, lng], { icon: markerIcon }).addTo(map);
      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

  return (
    <div
      ref={containerRef}
      className="visit-us-map"
      role="img"
      aria-label="Map showing Top Turkish Barbers location in Shrewsbury"
    />
  );
}
