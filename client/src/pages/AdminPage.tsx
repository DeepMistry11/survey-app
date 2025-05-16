import { useState, useEffect } from "react";

type AdminResponse = {
    id: number;
    questionId: number;
    response: string;
    createdAt: string;
    question: {
        title: string;
        description: string;
    };
};


export default function AdminPage(){
    const [responses, setResponses] = useState<AdminResponse[]>([]);
    const [grouped, setGrouped] = useState<Record<string, AdminResponse[]>>({});

    useEffect(()=>{
        fetch("http://localhost:4000/api/survey/responses")
        .then(res => res.json())
        .then(data => {
            setResponses(data);

            const groups: Record<string, AdminResponse[]> = {};
            data.forEach((r) => {
                const timeKey = new Date(r.createdAt).toISOString().slice(0,19);
                groups[timeKey] = groups[timeKey] || [];
                groups[timeKey].push(r);
            });
            setGrouped(groups);
        })
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              All Survey Responses
            </h1>
            {Object.entries(grouped).map(([timestamp, group], idx) =>(
                <div key={idx}>
                    <div>
                        <h2>Submission at {new Date(timestamp).toLocaleDateString() }</h2>
                    </div>
                    <ul className="space-y-4">
                        {group.map((r) => (
                            <li key={r.id} className="border-b pb-2">
                                <p className="text-sm text-gray-600">{r.question.title}</p>
                                <p className="text-lg font-medium text-gray-800">{r.response}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
        </div>
      );
}