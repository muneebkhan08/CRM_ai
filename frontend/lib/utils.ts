import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        active: 'badge-active',
        inactive: 'badge-inactive',
        churned: 'badge-churned',
        prospect: 'badge-prospect',
        new: 'badge-prospect',
        contacted: 'badge-active',
        qualified: 'badge-active',
        proposal: 'badge-medium',
        negotiation: 'badge-high',
        won: 'badge-active',
        lost: 'badge-churned',
        prospecting: 'badge-prospect',
        qualification: 'badge-active',
        closed_won: 'badge-active',
        closed_lost: 'badge-churned',
        todo: 'badge-prospect',
        in_progress: 'badge-medium',
        completed: 'badge-active',
        cancelled: 'badge-inactive',
        high: 'badge-high',
        medium: 'badge-medium',
        low: 'badge-low',
        urgent: 'badge-churned',
    };
    return colors[status.toLowerCase()] || 'badge-inactive';
}

export function getStageLabel(stage: string): string {
    const labels: Record<string, string> = {
        prospecting: 'Prospecting',
        qualification: 'Qualification',
        proposal: 'Proposal',
        negotiation: 'Negotiation',
        closed_won: 'Closed Won',
        closed_lost: 'Closed Lost',
    };
    return labels[stage] || stage;
}

export function getPriorityIcon(priority: string): string {
    const icons: Record<string, string> = {
        urgent: '🔴',
        high: '🟠',
        medium: '🟡',
        low: '🟢',
    };
    return icons[priority.toLowerCase()] || '⚪';
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}
