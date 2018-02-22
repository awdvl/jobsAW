import bug from '../../_libs/bug';


export default (language, data, id) => {

    const jobDetails = data.jobs.get('details');
    const jobsLoc = data.jobs.getIn(['loc', language]);

    const companies = data.companies;
    const langCommon = data.locCommon.get(language);
    const cityName = langCommon.getIn(['city', 'name']);
    const countryName = langCommon.getIn(['country', 'name']);
    const jobType = langCommon.getIn(['job', 'type']);
                                                        // bug('loopToCombineJobData::langCommon', langCommon)
                                                        // bug('loopToCombineJobData::state', state)
    const getJobData = (job) => {
        const jobLoc = jobsLoc.get(job.id + '');
        const jobCompany = companies.get(job.company);

        job.text = {
            city: cityName.get(job.city),
            country: countryName.get(job.country),
            company: jobCompany.get('name'),
            type: jobType.get(job.type + ''),
            title: jobLoc.get('title'),
            intro: jobLoc.get('intro'),
        };

        job.param = {
            indy: jobCompany.get('indy'),
            empl: jobCompany.get('empl'),
        };

        return job;
    };


    return id ?
        [getJobData(jobDetails[id + ''])] :
        jobDetails.map(getJobData).toArray();
};