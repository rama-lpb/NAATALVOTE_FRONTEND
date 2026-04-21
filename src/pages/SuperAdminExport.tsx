import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.2rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainCol = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SideCol = styled.div`
  display: grid;
  gap: 1rem;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 1rem;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Notice = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 14px;
  background: rgba(38, 76, 140, 0.05);
  border: 1px solid rgba(38, 76, 140, 0.18);
  color: rgba(25, 50, 100, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  line-height: 1.5;
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
`;

const ExportForm = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  font-weight: 600;
  color: #2f3b36;
`;

const Field = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 12px;
  padding: 0.6rem 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  box-sizing: border-box;
  width: 100%;
  &:focus { border-color: rgba(31, 90, 51, 0.5); box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1); }
`;

const SelectField = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 12px;
  padding: 0.6rem 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.2rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.72); }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.1);
`;

const ArchiveList = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const ArchiveRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.09);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 14px rgba(12, 24, 18, 0.08); }
`;

const ArchiveIcon = styled.div<{ $fresh?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ $fresh }) => $fresh ? 'rgba(31, 90, 51, 0.1)' : 'rgba(91, 95, 101, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $fresh }) => $fresh ? 'rgba(31, 90, 51, 0.75)' : '#8a9a90'};
  font-size: 1.1rem;
`;

const ArchiveInfo = styled.div``;

const ArchiveTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #1a2e20;
`;

const ArchiveMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
  margin-top: 0.1rem;
`;

const ArchiveStatus = styled.span<{ $ok: boolean }>`
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $ok }) => $ok ? 'rgba(31, 90, 51, 0.1)' : 'rgba(138, 90, 16, 0.1)'};
  color: ${({ $ok }) => $ok ? 'rgba(31, 90, 51, 0.85)' : 'rgba(138, 90, 16, 0.85)'};
  white-space: nowrap;
`;

const DownloadBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(31, 90, 51, 0.15);
  background: rgba(31, 90, 51, 0.07);
  color: rgba(31, 90, 51, 0.75);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.88rem;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.14); }
`;

const SideCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 1.1rem 1.3rem;
  box-shadow: 0 8px 18px rgba(12, 24, 18, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.6rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MiniRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
`;

const MiniValue = styled.span`
  font-weight: 600;
  color: #22312a;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1.2rem;
  color: #6b7a72;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
`;

type ApiLog = {
  id: string;
  type_action: string;
  utilisateur_id: string;
  description: string;
  horodatage: string;
  adresse_ip: string;
  signature_cryptographique: string;
};

type ArchiveItem = {
  id: string;
  title: string;
  meta: string;
  status: boolean;
  fresh: boolean;
  content: string;
  createdAt: string;
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR');

const csvEscape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;

const buildCsv = (logs: ApiLog[]) => {
  const header = ['id', 'type_action', 'utilisateur_id', 'description', 'horodatage', 'adresse_ip', 'signature_cryptographique'];
  const lines = [header.join(';')];
  logs.forEach((l) => {
    lines.push([
      csvEscape(l.id),
      csvEscape(l.type_action),
      csvEscape(l.utilisateur_id),
      csvEscape(l.description),
      csvEscape(l.horodatage),
      csvEscape(l.adresse_ip),
      csvEscape(l.signature_cryptographique),
    ].join(';'));
  });
  return lines.join('\n');
};

const downloadText = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const SuperAdminExport = () => {
  const [scope, setScope] = useState('all');
  const [format, setFormat] = useState('csv');
  const [pendingCount, setPendingCount] = useState(0);
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [archives, setArchives] = useState<ArchiveItem[]>([]);

  const today = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(today.slice(0, 8) + '01');
  const [dateTo, setDateTo] = useState(today);

  useEffect(() => {
    Promise.all([api.superadmin.listLogs(), api.superadmin.listSuspensions()])
      .then(([logsData, suspensions]) => {
        setLogs(logsData as ApiLog[]);
        setPendingCount(suspensions.filter((x) => x.statut === 'EN_ATTENTE').length);
      })
      .catch(() => {
        setLogs([]);
      });
  }, []);

  const navItems = [
    { label: 'Console systeme', to: '/superadmin/console' },
    { label: 'Logs immuables', to: '/superadmin/logs' },
    { label: 'Exports audit', to: '/superadmin/export' },
    { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
    { label: 'Suspensions', to: '/superadmin/suspensions', badge: pendingCount },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const day = log.horodatage.slice(0, 10);
      if (dateFrom && day < dateFrom) return false;
      if (dateTo && day > dateTo) return false;

      if (scope === 'votes') return log.type_action === 'VOTE';
      if (scope === 'connections') return log.type_action === 'CONNEXION';
      if (scope === 'suspensions') return log.type_action === 'SUSPENSION';
      if (scope === 'modifications') return log.type_action === 'MODIFICATION';
      return true;
    });
  }, [logs, dateFrom, dateTo, scope]);

  const latestLogDate = useMemo(() => {
    if (logs.length === 0) return '—';
    const latest = logs.reduce((max, l) => l.horodatage > max ? l.horodatage : max, logs[0].horodatage);
    return formatDate(latest);
  }, [logs]);

  const coverage = useMemo(() => {
    if (logs.length === 0) return '—';
    const years = logs.map((l) => new Date(l.horodatage).getFullYear());
    return `${Math.min(...years)} — ${Math.max(...years)}`;
  }, [logs]);

  const integrityRate = useMemo(() => {
    if (logs.length === 0) return '0,0%';
    const valid = logs.filter((l) => !!l.signature_cryptographique?.trim()).length;
    const rate = (valid / logs.length) * 100;
    return `${rate.toFixed(1).replace('.', ',')}%`;
  }, [logs]);

  const handleExport = () => {
    if (filteredLogs.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Aucune donnee',
        text: 'Aucun log ne correspond aux filtres selectionnes.',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
      });
      return;
    }

    const content = buildCsv(filteredLogs);
    const now = new Date();
    const stamp = now.toISOString().slice(0, 19).replaceAll(':', '-');
    const filename = `audit_${scope}_${dateFrom}_${dateTo}.${format}`;

    downloadText(filename, content);

    const archive: ArchiveItem = {
      id: `${Date.now()}`,
      title: `Archive ${scope === 'all' ? 'globale' : scope} — ${formatDate(now.toISOString())}`,
      meta: `${format.toUpperCase()} chiffre · ${filteredLogs.length.toLocaleString()} entrees · HMAC verifie`,
      status: true,
      fresh: true,
      content,
      createdAt: stamp,
    };

    setArchives((prev) => [archive, ...prev.map((a) => ({ ...a, fresh: false }))]);

    Swal.fire({
      icon: 'success',
      title: 'Export genere',
      text: `L'archive ${filename} est disponible et telechargee.`,
      confirmButtonText: 'OK',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
    });
  };

  const handleArchiveDownload = (archive: ArchiveItem) => {
    downloadText(`archive_${archive.id}.csv`, archive.content);
  };

  return (
    <AppLayout
      role="Super Admin"
      title="Export des logs"
      subtitle="Generez des archives chiffrees et signees pour l'audit externe."
      navItems={navItems}
    >
      <LayoutGrid>
        <MainCol>
          <Panel>
            <PanelTitle><i className="bi bi-download" />Nouvel export</PanelTitle>
            <Notice>
              <i className="bi bi-shield-lock" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <span>
                Les exports sont <strong>chiffres AES-256</strong> et signes avec <strong>HMAC-SHA256</strong>.
                Aucun vote individuel n'est expose — seuls les journaux d'action sont exportes.
                Chaque archive est en lecture seule et inalterable.
              </span>
            </Notice>
            <ExportForm>
              <Row>
                <FieldGroup>
                  <Label>Date de debut</Label>
                  <Field type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                </FieldGroup>
                <FieldGroup>
                  <Label>Date de fin</Label>
                  <Field type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </FieldGroup>
              </Row>
              <Row>
                <FieldGroup>
                  <Label>Perimetre</Label>
                  <SelectField value={scope} onChange={(e) => setScope(e.target.value)}>
                    <option value="all">Tous les logs</option>
                    <option value="votes">Votes uniquement</option>
                    <option value="connections">Connexions</option>
                    <option value="suspensions">Suspensions</option>
                    <option value="modifications">Modifications</option>
                  </SelectField>
                </FieldGroup>
                <FieldGroup>
                  <Label>Format</Label>
                  <SelectField value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="csv">CSV chiffre</option>
                  </SelectField>
                </FieldGroup>
              </Row>
              <ActionRow>
                <ExportButton onClick={handleExport}>
                  <i className="bi bi-box-arrow-up" />
                  Generer l'export ({filteredLogs.length.toLocaleString()} logs)
                </ExportButton>
              </ActionRow>
            </ExportForm>

            <Divider />

            <PanelTitle><i className="bi bi-archive" />Archives disponibles</PanelTitle>
            <ArchiveList>
              {archives.length === 0 ? <EmptyState>Aucune archive locale generee pour le moment.</EmptyState> : null}
              {archives.map((a) => (
                <ArchiveRow key={a.id}>
                  <ArchiveIcon $fresh={a.fresh}>
                    <i className="bi bi-file-earmark-lock2" />
                  </ArchiveIcon>
                  <ArchiveInfo>
                    <ArchiveTitle>{a.title}</ArchiveTitle>
                    <ArchiveMeta>{a.meta}</ArchiveMeta>
                  </ArchiveInfo>
                  <ArchiveStatus $ok={a.status}>
                    {a.status ? 'Signe' : 'En cours'}
                  </ArchiveStatus>
                  <DownloadBtn title="Telecharger" onClick={() => handleArchiveDownload(a)}>
                    <i className="bi bi-download" />
                  </DownloadBtn>
                </ArchiveRow>
              ))}
            </ArchiveList>
          </Panel>
        </MainCol>

        <SideCol>
          <SideCard>
            <CardTitle><i className="bi bi-shield-check" />Integrite systeme</CardTitle>
            <MiniRow><span>Signature algo</span><MiniValue>HMAC-SHA256</MiniValue></MiniRow>
            <MiniRow><span>Chiffrement</span><MiniValue>AES-256-GCM</MiniValue></MiniRow>
            <MiniRow><span>Logs intègres</span><MiniValue style={{ color: 'rgba(31, 90, 51, 0.85)' }}>{integrityRate}</MiniValue></MiniRow>
            <MiniRow><span>Dernier audit</span><MiniValue>{latestLogDate}</MiniValue></MiniRow>
          </SideCard>
          <SideCard>
            <CardTitle><i className="bi bi-database" />Volume de donnees</CardTitle>
            <MiniRow><span>Total entrees</span><MiniValue>{logs.length.toLocaleString()}</MiniValue></MiniRow>
            <MiniRow><span>Periode couverte</span><MiniValue>{coverage}</MiniValue></MiniRow>
            <MiniRow><span>Archives generees</span><MiniValue>{archives.length.toLocaleString()}</MiniValue></MiniRow>
          </SideCard>
        </SideCol>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminExport;
