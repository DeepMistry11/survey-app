import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.question.createMany({
        data: [
            {
                title: "What is your age?",
                description: "Enter your age in years.",
                type:"number",
                required: true
            },
            {
                title: "Deep Do you have any health conditions?",
                description: "Mention any conditions or illnesses",
                type: "text",
                required: true
            },
            {
                title: "What is your annual income?",
                description: "Please enter a rough estimate of your annual income.",
                type: "number",
                required: true
            }
        ]
    });
    console.log("Seeded survey questions");
}

main().catch(console.error).finally(() => prisma.$disconnect());