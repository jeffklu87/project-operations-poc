interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="progress" aria-label={label ?? `Progress ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
