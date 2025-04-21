import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const editor = await prisma.user.create({
        data: {
            email: 'editor@test.com',
            password: 'test',
            role: 'EDITOR'
        }
    })
    const contributor = await prisma.user.create({
        data: {
            email: 'contributor@test.com',
            password: 'test',
            role: 'CONTRIBUTOR'
        }
    })
    await prisma.contentItem.create({
        data: {
            title: 'Editor\'s Choice',
            authors: {
                connect: [{ id: editor.id }]
            },
            type: 'ARTICLE',
            status: 'PUBLISHED'
        }
    })
    await prisma.contentItem.create({
        data: {
            title: 'Contributor\'s Choice',
            authors: {
                connect: [{ id: contributor.id }]
            },
            type: 'VIDEO',
            status: 'DRAFT'
        }
    })

    console.log('Database seeded successfully')
}
main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
