import api from '@/api'

const BASE_URL = '/project'

export const getProjects = async () => {
    try {
        const res = await api.get('/project/list', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        const projectList = res.data

        for (const project of projectList) {
            if (project.images == undefined || project.images.length === 0) {
                const tempImage = {
                    imageType: 'Project',
                    imageUrl: '/images/logo.png',
                    postId: project.projectId,
                    createdAt: '',
                }

                project.images = [tempImage]
                project.thumbnailImage = tempImage
                project.thumbnailUrl = tempImage.imageUrl
            }
        }

        return projectList
    } catch (error) {
        console.error('프로젝트 리스트 조회 실패:', error)
        throw error
    }
}

export const getRecommendedProjects = async () => {
    try {
        const res = await api.get('/project/list/keyword', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        const projectList = res.data

        console.log('✅ getRecommendedProjects - projectList before:', projectList)

        for (const project of projectList) {
            if (project.images == undefined || project.images.length === 0) {
                const tempImage = {
                    imageType: 'Project',
                    imageUrl: '/images/logo.png',
                    postId: project.projectId,
                    createdAt: '',
                }

                project.images = [tempImage]
                project.thumbnailImage = tempImage
                project.thumbnailUrl = tempImage.imageUrl
            }
        }

        console.log('✅ getRecommendedProjects - projectList after:', projectList)

        return projectList
    } catch (error) {
        console.error('관심 기반 프로젝트 리스트 조회 실패:', error)
        throw error
    }
}
