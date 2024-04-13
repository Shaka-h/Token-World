import router from "@/router/index.js";
import { notifyError, notifySuccess } from "@/services/notificationService.js";
import { StorageService } from "@/services/storageService.js";
import { defineStore } from "pinia";

export const useDigitalClubsStore = defineStore('digitalClubsStore', {
    state: () => {
        return {
            isLoading: false,
            documentLink: null,
            openDocumentViewer: false,
            documentTitle: null,
            state: {
                pagination: {},
                clubRegistrationReport: [],
                institutions: [],
                clubCategory: [],
                smsConfigurations: [],
                newsAndUpdates: [],
                mentorDashboard: [],
                memberDashboard: [],
                newsImages: [],
                newsList: [],
                publishedNews: [],
                clubRegistrationCriteria: [],
                carousel: [],
                memberAccounts: [],
                digitalClubApplications: [],
                myDigitalClub: [],
                digitalClubInvitations: [],
                mydigitalClubInvitations: [],
                digitalClubMembers: [],
                digitalClubLeaders: [],
                regions: [],
                districts: [],
                wards: [],
                streets: [],
                alumniTestimonials:[],
                digitalClubs: [],
                openEvent: [],
                clubEvent: [],
                clubEventInvitation: [],
                generalEventInvitation: [],
                digitalClubAlumni:[],
                registerInvitees: [],
                digitalClubSubClub: [],
                landing: [],
                resourcesCategory: [],
                folderCategory: [],
                resourcesFiles: [],
                sharedFolderFiles: [],
                sharedFoldersFiles: [],
                digitalClubSubClubsMembers: [],
                regulatorUsers:[],
                userProfile:[],
                clubEventAttachments:[],
                generalEventAttachments:[],
                clubMeetingAgenda: [],
                clubMeetingMinute: [],
                challenges: [],
                joiningRequests: [],
                challengesEligibility: [],
                challengesRequests: [],
                challengesApproved: [],
                challengesPending: [],
                challengesRejected: [],
                challengeTeams: [],
                generalEventSpeakers:[],
                clubEventGallery:[],
                userRoles:[],
                contactMessage: [],
                expertCertificate: [],
                footerLinks: [],
                requestToBeClubExpert: [],
                rankingCriteria: [],
                sponsorship: [],
                sponsor:[],
                sponsorContributions: [],
                challengeSponsor:[],
                challengeJudges:[],
                eligibilityCriteria: [],
                eligibilityCriteriaMatrix: [],
                ExpertsClubs: [],
                sponsorRequests:[],
                DigitalChallengePrizes:[],
                expertSessions: [],
                expertSessionsReviews: [],
                expertApplicationsComment: [],
                experts: [],
                expertDetails: [],
                DigitalChallengeTasks:[],
                DigitalChallengeStages:[],
                sponsorshipAttachments: [],
                challengeProposal: [],
                sponsorshipContribution:[],
                regulatorDashboard: [],
                documentaries: [],
                requestClubExpert: [],
                challengeTaskResults: [],
                challengeApplicants: [],
                challengeApplicantsTasks: [],
                challengeJudgeTasksMarks: [],
                commitMarks: [],
                memberRegistrationReport: [],
                eventPerformanceReport: [],
                expertSessionAttachment: [],
                clubApplicationReport: [],
                memberAttendanceRateReport: [],
                performanceDashboard: [],
                userPassword: [],
                acceptedDigitalClubInvitations: [],
                rejectedDigitalClubInvitations: [],
                sponsorTestimonials: [],
                newsCategories: [],
                socialLinks: []
            }
        }
    },

    getters: {
      getStoreItem: (state) => {
          return (entity) => state.state[entity]
      }
    },


    actions: {

        async login(user) {

            this.isLoading = true
            let url = `${import.meta.env.VITE_APP_DIGITAL_CLUBS_SERVER}/oauth2/access_token`

            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    client_id: import.meta.env.VITE_APP_CLIENT_ID,
                    client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
                    grant_type: 'password',
                    username: user.email,
                    password: user.password
                }),
                url,
            };
            axios(options).then(async (response) => {
                if (response.status === 200) {
                    let storageService = new StorageService()
                    // console.log(response.data.access_token)
                    storageService.setItem('access_token', response.data.access_token);
                    storageService.setItem('refresh_token', response.data.refresh_token);
                    storageService.setItem('expires_in', response.data.expires_in);

                    let expireTime = new Date()
                    expireTime.setSeconds(expireTime.getSeconds() + response.data.expires_in)
                    storageService.setItem('expireTime', expireTime.getTime())

                    await this.loadUserProfile('login')
                    // if (response2) router.push({name: "AuditLanding"})
                    notifySuccess("Successful login");

                }
            }).catch(async (error) => {
                if (error) {
                    if(error?.response?.data?.error === "invalid_grant"){
                        await notifyError("Sorry ! Wrong Credentials Provided")
                    }
                }
            }).finally(async () => {
                this.isLoading = false
            });
        },

        async loadUserProfile(from = 'other') {
            let storageService = new StorageService();

            return await apolloClient.query({
                fetchPolicy: "no-cache",
                query: getUserProfile
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (result?.response?.status) {
                    let userProfile = result.data?.length ? result.data[0] : {}
                    storageService.setItem('userProfile', userProfile)
                    if (userProfile?.profileType === 'REGULATOR') {
                        await this.loadUserRole(from)
                    } else if (userProfile?.profileType === 'MENTOR') {
                        await this.loadMyClub('/academic-institution/dashboard')

                    } else if (userProfile?.profileType === 'EXPERT') {
                        await this.loadMyClub('/expert/expert-profile')

                    } else if (userProfile?.profileType === 'COMPETITION_JUDGE') {
                        await this.loadMyClub('/judge/dashboard')

                    } else if (userProfile?.profileType === 'NORMAL_USERS') {
                        await this.loadMyClub('/clubs/dashboard')

                    }else if (userProfile?.profileType === 'SPONSOR') {
                        // await this.loadMyClub('/clubs/dashboard')
                        router.push('/sponsor/dashboard')
                    
                    } 
                    else if (userProfile?.profileType === 'SYSTEM_ADMIN') {
                        router.push('/admin/dashboard')

                    } else {
                        notifyError('Invalid User Type!');

                    }
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);

                }
                return result?.response?.status;
            }).finally(async () => {
                this.isLoading = false;
            });
        },

        async loadMyClub(path = null) {
            return await apolloClient.query({
                fetchPolicy: "no-cache",
                query: getDigitalClubs,
                variables: {
                    filtering: {
                        pageNumber: 1,
                        myClub: true
                    }
                }
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (result?.response?.status) {
                    let storageService = new StorageService()
                    if (result?.data?.length) {
                        storageService.setItem('myClub', result?.data[0])
                    }
                    if (path) {
                        router.push(path)
                    }
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);
                }
                return result?.response?.status;
            }).finally(async () => {
                this.isLoading = false;
            });
        },

        async loadUserRole(from = 'other') {
            let storageService = new StorageService();

            return await apolloClient.query({
                fetchPolicy: "no-cache",
                query: getCurrentUserRoles
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (result?.response?.status) {
                    let userRole = result.data?.length ? result.data[0] : {}
                    storageService.setItem('rolePermissions', userRole?.rolePermissions)
                    if (from === 'login') router.push('/regulator/dashboard')
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);
                }
                return result?.response?.status;
            }).finally(
                this.isLoading = false)
        },

        changeStoreItemState(item) {
            let { entity, id, data, remove } = item;
            try {
                if (Array.isArray(this.state[entity])) {
                    let index = this.state[entity].findIndex((el) => el?.id === id);
                    if (index !== -1) {
                        if (remove) {
                            this.state[entity].splice(index, 1);
                        } else {
                            this.state[entity][index] = data;
         n                }
                    } else {
                        if (!Array.isArray(data)) this.state[entity].unshift(data);
                        else {
                            for (const datum of data) {
                                this.state[entity].unshift(datum);
                            }
                        }
                    }
                    this.state[entity] = [...this.state[entity]];
                }
            } catch (e) {
                console.log(e);
            }
        },

        async changePassword(passwordInput) {
            this.isLoading = true;
            return await apolloClient.mutate({
              fetchPolicy: "no-cache",
              mutation: changeUserPasswordMutation,
              variables: {
                input: passwordInput
              }
            }).then(async (response) => {
              let result = Object.values(response)[0];
              result = Object.values(result)[0];
              if (result?.response?.status) {
                notifySuccess(result.response.message);
                new StorageService().clearStorage()

              } else {
                notifyError(`${result.response.code}: ${result.response.message}`);
              }
              return result?.response?.status;
            }).finally(async () => {
              this.isLoading = false;
            });
          },

        async createStoreItem(item) {
            let { entity, input, mutation, isInput } = item;
            this.isLoading = true;
            return await apolloClient.mutate({
                fetchPolicy: "no-cache",
                mutation,
                variables: (Object.keys(input).length === 1) && isInput ? input : { input }
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (result?.response?.status) {
                    notifySuccess(result.response.message);
                    if (result?.data && entity?.length)
                        this.changeStoreItemState({
                            entity,
                            data: result.data
                        });
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);
                }
                return result?.response?.status;
            }).finally(async () => {
                this.isLoading = false;
            });
        },

        async updateStoreItem(item) {
            let { entity, input, isInput, mutation } = item;
            delete input.id;
            this.isLoading = true
            return await apolloClient.mutate({
                fetchPolicy: "no-cache",
                mutation,
                variables: (Object.keys(input).length === 1) && isInput ? input : { input }
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (result?.response?.status) {
                    notifySuccess(result.response.message);
                    if (result?.data && entity?.length)
                        this.changeStoreItemState({
                            entity,
                            id: result.data.id,
                            data: result.data
                        });
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);
                }
                return result?.response?.status;
            }).finally(async () => {
                this.isLoading = false
            });
        },

        async deleteStoreItem(item) {
            let { entity, id, input, isInput, mutation } = item;
            this.isLoading = true
            return await apolloClient.mutate({
                fetchPolicy: "no-cache",
                mutation,
                variables: isInput ? { input } : input
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (result?.response?.status) {
                    notifySuccess(result.response.message);
                    this.changeStoreItemState({
                        entity,
                        id: id,
                        remove: true
                    });
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);
                }
                return result?.response?.status;
            }).finally(async () => {
                this.isLoading = false
            });
        },

        async loadStoreItem(item) {
            let { entity, filtering, query, isInput } = item;
            this.isLoading = true
            this.state[entity] = []
            return await apolloClient.query({
                fetchPolicy: "no-cache",
                query: query,
                variables: isInput ? filtering : { filtering }
            }).then(async (response) => {
                let result = Object.values(response)[0];
                result = Object.values(result)[0];
                if (Object.hasOwn(result, "page")) {
                    this.state.pagination = result?.page
                } else {
                    this.state.pagination = {}
                }
                if (result.response.status) {
                    this.state[entity] = result?.data
                } else {
                    notifyError(`${result.response.code}: ${result.response.message}`);
                }
                return result.data;
            }).finally(async () => {
                this.isLoading = false
            });
        }
    }
})

