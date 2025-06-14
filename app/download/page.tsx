import TimerDownloadPage from "@/components/timer-download-page"

export default function DownloadPage() {
  // secure logic: maybe fetch from Supabase, a DB, or just hardcode for now
  const secureLink = "https://files.oneshotengineer.in/quantum/AKTU_CS_2024.pdf"

  return <TimerDownloadPage link={secureLink} />
}
