'use client';

import { useRef, useEffect, useState } from 'react';

interface Node {
  id: string | number;
  label: string;
  title?: string;
}

interface Edge {
  from: string | number;
  to: string | number;
}

interface GraphViewProps {
  nodes: Node[];
  edges: Edge[];
}

export function GraphView({ nodes, edges }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    // vis 라이브러리를 동적으로 로드
    import('vis-network/standalone/umd/vis-network.min.js').then(() => {
      const { Network } = require('vis-network/standalone/umd/vis-network.min.js');
      
      const data = {
        nodes: nodes.map(n => ({
          id: n.id,
          label: n.label,
          title: n.title || n.label,
          shape: 'box',
          margin: 12,
          widthConstraint: { maximum: 220 },
          color: {
            background: '#3b82f6',
            border: '#1e40af',
            highlight: {
              background: '#1e3a8a',
              border: '#0f172a',
            },
            hover: {
              background: '#2563eb',
              border: '#1e40af',
            },
          },
          font: { 
            size: 15, 
            color: '#ffffff',
            bold: { color: '#ffffff', size: 15 },
            face: 'system-ui, -apple-system, sans-serif',
          },
          borderWidth: 2,
          borderWidthSelected: 3,
          shadow: {
            enabled: true,
            color: 'rgba(0, 0, 0, 0.2)',
            size: 8,
            x: 0,
            y: 2,
          },
        })),
        edges: edges.map(e => ({
          from: e.from,
          to: e.to,
          arrows: { to: { enabled: true, scaleFactor: 0.8 } },
          color: {
            color: '#cbd5e1',
            highlight: '#3b82f6',
            hover: '#64748b',
          },
          width: 2,
          smooth: { 
            type: 'continuous',
            roundness: 0.5,
          },
          font: { size: 12, align: 'middle' },
          shadow: {
            enabled: true,
            color: 'rgba(0, 0, 0, 0.1)',
            size: 4,
            x: 0,
            y: 1,
          },
        })),
      };

      const options = {
        physics: {
          enabled: true,
          forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
            damping: 0.4,
            avoidOverlap: 1,
          },
          maxVelocity: 50,
          timestep: 0.35,
          stabilization: { iterations: 150 },
        },
        interaction: {
          navigationButtons: true,
          keyboard: true,
          zoomView: true,
          hover: true,
          dragView: true,
          dragNodes: true,
        },
        configure: false,
      };

      if (containerRef.current) {
        new Network(containerRef.current, data, options);
      }
    });
  }, [isClient, nodes, edges]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '500px',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
        overflow: 'hidden',
      }}
    />
  );
}
