// app/api/jobs/route.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Handle POST request to create a new job
export async function POST(req: Request) {
  const { jobName, role, company, package: jobPackage, experience, skillset, location, email } =
    await req.json()

  try {
    const job = await prisma.job.create({
      data: {
        jobName,
        role,
        company,
        package: parseFloat(jobPackage),
        experience,
        skillset,
        location,
        email, // Add email to the data
      },
    })

    return new Response(JSON.stringify(job), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating job' }), { status: 500 })
  }
}

// Handle GET request to fetch all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany()
    return new Response(JSON.stringify(jobs), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching jobs' }), { status: 500 })
  }
}

// Handle DELETE request to delete a job
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    const deletedJob = await prisma.job.delete({
      where: {
        id: Number(id),
      },
    })

    return new Response(JSON.stringify(deletedJob), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting job' }), { status: 500 })
  }
}
