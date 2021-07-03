module.exports = {
    actions: {
        /**
         * Find user by API key
         * @actions
         * @param {String} apiKey - Token of the existing api key
         * @returns {Onject} - Authenticated user
         */
         findByApiKey: {
            params: {
                apiKey: {
                    type: "string"
                }
            },
            async handler(ctx) {
                const user = await this.adapter.findOne({
                    apiKeys: {
                        $elemMatch: {
                            token: ctx.params.apiKey
                        }
                    } 
                })
                return user
            }
        }
    }
}