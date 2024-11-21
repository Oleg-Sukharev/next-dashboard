"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";

interface Issue {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/issues", { signal });
        const data = await res.json();

        console.log(data, 'data');

        setIssues(data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();

    return () => controller.abort();
  }, [])

  const createIssue = () => {
    fetch("/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "1",
        description: "2",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setIssues((prevIssues) => [...prevIssues, data]);
      })
      .catch((error) => {
        console.error("Something went wrong:", error.message);
      });
  };

  return <div>
    <pre>{JSON.stringify(issues, null, 2)}</pre>
    <button onClick={createIssue}>Click me</button>
  </div>;
}
