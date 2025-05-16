import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

type Question = {
    id: number;
    title: string;
    description: string;
    type: string;
    required: boolean;
}


export default function SurveyPage(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("http://localhost:4000/api/survey/questions")
      .then(res => res.json())
      .then(setQuestions)
      .catch(() => setError("Failed to load questions"))
      .finally(() => setLoading(false));
    }, []);

    const onSubmit = async (data: any) => {
        // console.log("Form submitted:", data);
        try{
          await fetch("http://localhost:4000/api/survey/responses", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
          })
          localStorage.setItem("surveyResponses", JSON.stringify(data));
          navigate("/review")
        }catch{
          alert("Submission Failed");
        };
    };

    if (loading) return <p className="text-center p-4">Loading survey...</p>
    if (error) return <p className="text-center text-red-500 p-4">{error}</p>

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full bg-white p-8 rounded-xl shadow space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Personal Survey
            </h1>
            {questions.map((q) => (
                <div key={q.id}>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        {q.title}
                        {q.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">{q.description}</p>
                    <input 
                    {...register(`question-${q.id}`, {required: q.required})}
                    type = {q.type}
                    className = "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                    placeholder={`Enter your ${q.title.toLowerCase()}`}
                    />
                    {errors[`question-${q.id}`] && (
                        <p className="text-sm text-red-500">This field is required.</p>
                    )}
                </div>
            ))}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Submit Survey
          </button>
          </form>
        </div>
      );
}